import cluster from 'cluster';
import { availableParallelism } from 'node:os';
import http, { IncomingMessage, ServerResponse } from 'http';
import { startApp } from './server';
import { sendResponse } from './helpers/sendResponse';
import { STATUS_CODES } from './consts/statusCodes';
import { ERRORS } from './consts/errors';

const PORT = process.env.PORT || 4000;
const isMulti = process.env.mode === 'multi';
let currentWorkerIndex = 0;

if (isMulti) {
  if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running.`);
    console.log(`Creating ${availableParallelism()} workers...`);

    for (let i = 0; i < availableParallelism(); i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.error(`Worker ${worker.process.pid} died.`);
      console.log('Spawning a new worker...');
      cluster.fork();
    });

    const loadBalancer = startApp();

    loadBalancer.on('request', (req: IncomingMessage, res: ServerResponse) => {
      const workerList = Object.values(cluster.workers ?? {});
      if (workerList.length === 0) {
        sendResponse(res, STATUS_CODES.SERVER_UNAVAILABLE, {
          error: ERRORS.NO_WORKERS_AVAILABLE,
        });
        return;
      }

      const worker = workerList[currentWorkerIndex];
      currentWorkerIndex = (currentWorkerIndex + 1) % workerList.length;

      if (worker) {
        const workerPort = Number(PORT) + worker.id;
        const target = `http://localhost:${workerPort}${req.url}`;

        const proxyReq = http.request(
          target,
          {
            method: req.method,
            headers: req.headers,
          },
          (proxyRes) => {
            proxyRes.pipe(res, { end: true });
          }
        );

        req.pipe(proxyReq, { end: true });

        proxyReq.on('error', (err) => {
          console.error(`Error forwarding request: ${err.message}`);
          sendResponse(res, STATUS_CODES.SERVER_UNAVAILABLE, {
            error: ERRORS.INTERNAL_SERVER_ERROR,
          });
        });
      } else {
        sendResponse(res, STATUS_CODES.SERVER_UNAVAILABLE, {
          error: ERRORS.NO_WORKERS_FOUND,
        });
      }
    });
  } else {
    const serverPort = Number(PORT) + cluster.worker!.id;
    const server = http.createServer((_req, res) => {
      sendResponse(res, STATUS_CODES.CREATED, {
        message: `Response from Worker ${serverPort}, PID: ${process.pid}`,
      });
    });
    server.listen(serverPort, () => {
      console.log(`Worker ${process.pid} listening on port ${serverPort}`);
    });
  }
} else {
  startApp();
}
