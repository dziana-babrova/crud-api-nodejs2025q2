import { randomUUID } from 'crypto';
import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { METHODS } from './consts/methods';

const users: {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}[] = [];

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    const method = request.method;
    const parsedUrl = parse(request.url || '', true);

    if (method === METHODS.GET) {
    } else if (method === METHODS.POST) {
    } else if (method === METHODS.PUT) {
    } else if (method === METHODS.DELETE) {
    } else {
    }

    response.setHeader('Content-Type', 'text/html; charset=utf-8;');
    response.end('Hello METANIT.COM!');
  }
);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
