import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from '../helpers/sendResponse';
import { STATUS_CODES } from '../consts/statusCodes';
import { ERRORS } from '../consts/errors';
import { parseRequestBody } from '../helpers/parseBody';
import { users } from '../database/users';
import { validateUser } from '../helpers/validateUser';
import { validate } from 'uuid';

export const handlePutRequest = async (
  request: IncomingMessage,
  response: ServerResponse,
  pathname: string | null
) => {
  if (pathname && pathname.startsWith('/api/users/')) {
    const id = pathname.split('/').pop();
    if (id && validate(id)) {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        try {
          const user = await parseRequestBody(request);
          const validatedUser = validateUser(user);
          if (validatedUser) {
            users[userIndex] = {
              ...users[userIndex],
              username: validatedUser.username,
              age: validatedUser.age,
              hobbies: validatedUser.hobbies,
            };
            sendResponse(response, STATUS_CODES.SUCCESS, users[userIndex]);
          } else {
            sendResponse(response, STATUS_CODES.BAD_REQUEST, {
              error: ERRORS.MISSING_REQUIRED_FIELD,
            });
          }
        } catch {
          sendResponse(response, STATUS_CODES.BAD_REQUEST, {
            error: ERRORS.INVALID_BODY,
          });
        }
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
