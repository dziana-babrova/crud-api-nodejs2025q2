import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from '../helpers/sendResponse';
import { STATUS_CODES } from '../consts/statusCodes';
import { ERRORS } from '../consts/errors';
import { validate } from 'uuid';
import { users } from '../database/users';

export const handleDeleteRequest = async (
  request: IncomingMessage,
  response: ServerResponse,
  pathname: string | null
) => {
  if (pathname && pathname.startsWith('/api/users/')) {
    const id = pathname.split('/').pop();
    if (id && validate(id)) {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        users.splice(userIndex);
        sendResponse(response, STATUS_CODES.DELETED, 'Deleted successfully');
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
  } else {
    sendResponse(response, STATUS_CODES.NOT_FOUND, {
      error: ERRORS.ENDPOINT_NOT_FOUND,
    });
  }
};
