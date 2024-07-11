import { body, param } from 'express-validator';
import validateRequestProps from '../helpers/validations/validateRequestProps';

const getUserByIdValidator = [
  param('userId')
    .notEmpty()
    .withMessage('userId is mandatory')
    .isNumeric()
    .withMessage('userId must be a number')
    .isInt({ min: 1 })
    .withMessage('userId must be a positive number'),
];

const createUserValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is mandatory')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .isLength({ max: 20 })
    .withMessage('Name must be less than 20 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is mandatory')
    .isEmail()
    .withMessage('Email is not valid'),
  body('age')
    .notEmpty()
    .withMessage('Age is mandatory')
    .isNumeric()
    .withMessage('Age must be a number')
    .isInt({ min: 1 })
    .withMessage('Age must be a positive number'),
  body().custom(
    validateRequestProps.validateExtraProps(['name', 'email', 'age']),
  ),
];

const completeUpdateUserValidator = [
  param('userId')
    .notEmpty()
    .withMessage('userId is mandatory')
    .isNumeric()
    .withMessage('userId must be a number')
    .isInt({ min: 1 })
    .withMessage('userId must be a positive number'),
  body('name')
    .notEmpty()
    .withMessage('Name is mandatory')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .isLength({ max: 20 })
    .withMessage('Name must be less than 20 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is mandatory')
    .isEmail()
    .withMessage('Email is not valid'),
  body('age')
    .notEmpty()
    .withMessage('Age is mandatory')
    .isNumeric()
    .withMessage('Age must be a number')
    .isInt({ min: 1 })
    .withMessage('Age must be a positive number'),
  body().custom(
    validateRequestProps.validateExtraProps(['name', 'email', 'age']),
  ),
];

const partialUpdateUserValidator = [
  body().custom(
    validateRequestProps.validateAtLeastOneProps(['name', 'email', 'age']),
  ),
  param('userId')
    .notEmpty()
    .withMessage('userId is mandatory')
    .isNumeric()
    .withMessage('userId must be a number')
    .isInt({ min: 1 })
    .withMessage('userId must be a positive number'),
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .isLength({ max: 20 })
    .withMessage('Name must be less than 20 characters'),
  body('email').optional().isEmail().withMessage('Email is not valid'),
  body('age')
    .optional()
    .isNumeric()
    .withMessage('Age must be a number')
    .isInt({ min: 1 })
    .withMessage('Age must be a positive number'),
  body().custom(
    validateRequestProps.validateExtraProps(['name', 'email', 'age']),
  ),
];

const deleteUserByIdValidator = [
  param('userId')
    .notEmpty()
    .withMessage('userId is mandatory')
    .isNumeric()
    .withMessage('userId must be a number')
    .isInt({ min: 1 })
    .withMessage('userId must be a positive number'),
];

const userValidators = {
  getUserByIdValidator,
  createUserValidator,
  completeUpdateUserValidator,
  partialUpdateUserValidator,
  deleteUserByIdValidator,
};

export default userValidators;
