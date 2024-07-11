import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User identificator
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         age:
 *           type: integer
 *           description: User age
 *       example:
 *         id: 1
 *         name: Bruno Test
 *         email: brunotest@gmail.com
 *         age: 26
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list with all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Users list is empty
 *         content:
 *           application/json:
 *               example:
 *                 status: 404
 *                 message: Users list is empty
 */
const getUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(await userService.getAllUsers());
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get an specific user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User identificator
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *               example:
 *                 status: 404
 *                 message: User not found
 */
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId: number = Number(req.params.userId);
    res.status(200).json(await userService.getUserById(userId));
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Email already in use
 *         content:
 *           application/json:
 *               example:
 *                 status: 409
 *                 message: Email already in use
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *               example:
 *                 status: 400
 *                 message: Validation error
 *                 errors:
 *                   common:
 *                     - Properties that should not exist: id
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json(await userService.createUser(req.body));
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Completely update an user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User identificator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *               example:
 *                 status: 404
 *                 message: User not found
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *               example:
 *                 status: 400
 *                 message: Validation error
 *                 errors:
 *                   age:
 *                     - Age is mandatory
 *                     - Age must be a number
 *                     - Age must be a positive number
 */
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

/**
 * @swagger
 * /users/{userId}:
 *   patch:
 *     summary: Partially update an user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User identificator
 *     responses:
 *       200:
 *         description: User updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *               example:
 *                 status: 404
 *                 message: User not found
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *               example:
 *                 status: 400
 *                 message: Validation error
 *                 errors:
 *                   common:
 *                     - At least one of the following properties must be present: name, email, age
 */
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

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete an user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User identificator
 *     responses:
 *       200:
 *         description: Deleted user
 *         content:
 *           application/text:
 *               example:
 *                 User with id 1 was successfully deleted
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *               example:
 *                 status: 404
 *                 message: User not found
 */
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
