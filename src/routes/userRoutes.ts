import { Router } from 'express';
import userController from '../controllers/userController';
import userValidators from '../validators/userValidators';
import { requestValidationMiddleware } from '../middleware/requestValidationMiddleware';

const router = Router();

router.get('/', userController.getUserList);

router.get(
  '/:userId',
  userValidators.getUserByIdValidator,
  requestValidationMiddleware,
  userController.getUserById,
);

router.post(
  '/',
  userValidators.createUserValidator,
  requestValidationMiddleware,
  userController.createUser,
);

router.put(
  '/:userId',
  userValidators.completeUpdateUserValidator,
  requestValidationMiddleware,
  userController.completeUpdateUserById,
);

router.patch(
  '/:userId',
  userValidators.partialUpdateUserValidator,
  requestValidationMiddleware,
  userController.partialUpdateUserById,
);

router.delete(
  '/:userId',
  userValidators.deleteUserByIdValidator,
  requestValidationMiddleware,
  userController.deleteUserById,
);

export default router;
