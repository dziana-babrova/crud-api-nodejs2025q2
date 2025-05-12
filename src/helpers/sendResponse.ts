import { ServerResponse } from 'http';

export const sendResponse = async <T>(
  response: ServerResponse,
  statusCode: number,
  data: T
) => {
  if (response.writableEnded) return;
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(data));
};
