import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userService.getAllUsers());
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: number = Number(req.params.userId);
    res.status(200).json(await userService.getUserById(userId));
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json(await userService.createUser(req.body));
  } catch (error) {
    next(error);
  }
};

const completeUpdateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.userId);
    res
      .status(200)
      .json(await userService.completeUpdateUserById(userId, req.body));
  } catch (error) {
    next(error);
  }
};

const partialUpdateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.userId);
    res
      .status(200)
      .json(await userService.partialUpdateUserById(userId, req.body));
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = Number(req.params.userId);
    res.status(200).json(await userService.deleteUserById(userId));
  } catch (error) {
    next(error);
  }
};

const userController = {
  getUserList,
  getUserById,
  createUser,
  completeUpdateUserById,
  partialUpdateUserById,
  deleteUserById,
};

export default userController;
