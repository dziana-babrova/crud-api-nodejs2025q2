import { ServerResponse } from 'http';

export const sendResponse = async (
  response: ServerResponse,
  statusCode: number,
  data: any
) => {
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
};
