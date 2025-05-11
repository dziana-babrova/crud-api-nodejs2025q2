import { IncomingMessage, ServerResponse } from 'http';
import { sendResponse } from '../helpers/sendResponse';
import { STATUS_CODES } from '../consts/statusCodes';
import { ERRORS } from '../consts/errors';
import { parseRequestBody } from '../helpers/parseBody';
import { validateUser } from '../helpers/validateUser';
import { usersType } from '../database/users';

export const handlePostRequest = async (
  request: IncomingMessage,
  response: ServerResponse,
  pathname: string | null
) => {
  if (pathname === '/api/users' || pathname === '/api/users/') {
    try {
      const user = await parseRequestBody(request);
      const validatedUser = validateUser(user);

      if (validatedUser) {
        user.push(validatedUser);
        sendResponse(response, STATUS_CODES.CREATED, validatedUser);
      } else {
        sendResponse(
          response,
          STATUS_CODES.BAD_REQUEST,
          ERRORS.MISSING_REQUIRED_FIELD
        );
      }
    } catch {
      sendResponse(response, STATUS_CODES.BAD_REQUEST, ERRORS.INVALID_BODY);
    }
  } else {
    sendResponse(response, STATUS_CODES.NOT_FOUND, ERRORS.ENDPOINT_NOT_FOUND);
  }
};
