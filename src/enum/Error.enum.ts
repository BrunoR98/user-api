export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
  USER_NOT_FOUND = 'User not found',
  USER_LIST_EMPTY = 'Users list is empty',
  EMAIL_ALREADY_IN_USE = 'Email already in use',
  BAD_REQUEST = 'Bad request',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}
