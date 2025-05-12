import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { METHODS } from './consts/methods';
import { handleGetRequest } from './handlers/getHandler';
import { handlePostRequest } from './handlers/postHandler';
import { handlePutRequest } from './handlers/putHaldler';
import { handleDeleteRequest } from './handlers/deleteHandler';
import { sendResponse } from './helpers/sendResponse';
import { STATUS_CODES } from './consts/statusCodes';
import { ERRORS } from './consts/errors';

export const server = createServer(
  async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const method = request.method;
      const parsedUrl = parse(request.url || '', true);
      const path = parsedUrl.pathname;

      if (method === METHODS.GET) {
        await handleGetRequest(request, response, path);
      } else if (method === METHODS.POST) {
        await handlePostRequest(request, response, path);
      } else if (method === METHODS.PUT) {
        await handlePutRequest(request, response, path);
      } else if (method === METHODS.DELETE) {
        await handleDeleteRequest(request, response, path);
      } else {
        sendResponse(response, STATUS_CODES.NOT_FOUND, {});
      }
    } catch {
      sendResponse(
        response,
        STATUS_CODES.SERVER_UNAVAILABLE,
        ERRORS.SERVER_ERROR
      );
    }
  }
);

const PORT = process.env.PORT || 4000;

export const startApp = () => {
  return server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};
