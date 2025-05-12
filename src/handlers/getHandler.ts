import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from '../helpers/sendResponse';
import { ERRORS } from '../consts/errors';
import { STATUS_CODES } from '../consts/statusCodes';
import { users } from '../database/users';
import { validate } from 'uuid';

export const handleGetRequest = async (
  _request: IncomingMessage,
  response: ServerResponse,
  pathname: string | null
) => {
  if ((pathname && pathname === '/api/users') || pathname === '/api/users/') {
    sendResponse(response, STATUS_CODES.SUCCESS, users);
  } else if (pathname && pathname.startsWith('/api/users/')) {
    const id = pathname.split('/').pop();
    if (id && validate(id)) {
      const data = users.find((user) => user.id === id);
      if (data) {
        sendResponse(response, STATUS_CODES.SUCCESS, data);
      } else {
        sendResponse(response, STATUS_CODES.NOT_FOUND, {
          error: ERRORS.USER_NOT_FOUND,
        });
      }
    } else {
      sendResponse(response, STATUS_CODES.BAD_REQUEST, {
        error: ERRORS.USERID_NOT_VALID,
      });
    }
  }
  if (pathname && pathname === '/server/error') {
    throw new Error();
  } else {
    sendResponse(response, STATUS_CODES.NOT_FOUND, {
      error: ERRORS.ENDPOINT_NOT_FOUND,
    });
  }
};
