import { IncomingMessage } from 'http';

export const parseRequestBody: (request: IncomingMessage) => Promise<any> = (
  request
) => {
  return new Promise((resolve, reject) => {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    request.on('error', (error) => reject(error));
  });
};
