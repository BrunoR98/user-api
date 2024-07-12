import { ErrorMessage, HttpStatusCode } from '../../../enum/Error.enum';
import { HttpCustomException } from '../../../exceptions/httpCustomException';

const emptyUserListError = new HttpCustomException(
  HttpStatusCode.NOT_FOUND,
  ErrorMessage.USER_LIST_EMPTY,
);

const userNotFoundError = new HttpCustomException(
  HttpStatusCode.NOT_FOUND,
  ErrorMessage.USER_NOT_FOUND,
);

const validationExtraIdPropError = {
  status: 400,
  message: 'Validation error',
  errors: {
    common: ['Properties that should not exist: id'],
  },
};

const validationAgePropError = {
  status: 400,
  message: 'Validation error',
  errors: {
    age: ['Age must be a positive number'],
  },
};

const userErrorMock = {
  emptyUserListError,
  userNotFoundError,
  validationExtraIdPropError,
  validationAgePropError,
};

export default userErrorMock;
