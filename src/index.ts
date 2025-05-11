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
import { CONTENT_TYPE } from './consts/contentTypes';

const server = createServer(
  async (request: IncomingMessage, response: ServerResponse) => {
    const method = request.method;
    const parsedUrl = parse(request.url || '', true);
    const path = parsedUrl.pathname;

    if (method === METHODS.GET) {
      await handleGetRequest();
    } else if (method === METHODS.POST) {
      await handlePostRequest();
    } else if (method === METHODS.PUT) {
      await handlePutRequest();
    } else if (method === METHODS.DELETE) {
      await handleDeleteRequest();
    } else {
      sendResponse(response, STATUS_CODES.NOT_FOUND, CONTENT_TYPE.JSON, {});
    }
  }
);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
