import { ServerResponse } from 'http';
import { CONTENT_TYPE } from '../consts/contentTypes';

export const sendResponse = async (
  response: ServerResponse,
  statusCode: number,
  contentType: typeof CONTENT_TYPE.HTML,
  data: any
) => {
  response.writeHead(statusCode, contentType);
  response.end(JSON.stringify(data));
};
