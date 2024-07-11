import { CustomValidator } from 'express-validator';
import { HttpCustomException } from '../../exceptions/httpCustomException';
import { HttpStatusCode } from '../../enum/Error.enum';

const validateExtraProps = (allowedProps: string[]): CustomValidator => {
  return (value, { req }) => {
    const extraProps = Object.keys(req.body).filter(
      (prop) => !allowedProps.includes(prop),
    );
    if (extraProps.length > 0) {
      throw new HttpCustomException(
        HttpStatusCode.BAD_REQUEST,
        `Properties that should not exist: ${extraProps.join(', ')}`,
      );
    }
    return true;
  };
};

const validateAtLeastOneProps = (allowedProps: string[]): CustomValidator => {
  return (value, { req }) => {
    const bodyProps = Object.keys(req.body);
    const hasAtLeastOne = allowedProps.some((prop) => bodyProps.includes(prop));
    if (!hasAtLeastOne) {
      throw new HttpCustomException(
        HttpStatusCode.BAD_REQUEST,
        `At least one of the following properties must be present: ${allowedProps.join(', ')}`,
      );
    }
    return true;
  };
};

const validateRequestProps = {
  validateExtraProps,
  validateAtLeastOneProps,
};

export default validateRequestProps;
