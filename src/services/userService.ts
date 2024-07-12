import { ErrorMessage, HttpStatusCode } from '../enum/error.enum';
import { HttpCustomException } from '../exceptions/httpCustomException';
import { CreateUserRequest } from '../interfaces/user/request/createUserRequest.interface';
import { UpdateUserRequest } from '../interfaces/user/request/updateUserRequest.interface';
import { User } from '../models/user.model';

const users: User[] = [];
let nextUserId: number = 1;

const getAllUsers = async (): Promise<User[]> => {
  if (users.length === 0)
    throw new HttpCustomException(
      HttpStatusCode.NOT_FOUND,
      ErrorMessage.USER_LIST_EMPTY,
    );
  return users;
};

const getUserById = async (id: number): Promise<User> => {
  const findUser = users.find((item) => item.id === id);
  if (!findUser)
    throw new HttpCustomException(
      HttpStatusCode.NOT_FOUND,
      ErrorMessage.USER_NOT_FOUND,
    );
  return findUser;
};

const createUser = async (body: CreateUserRequest): Promise<User> => {
  await checkExistUser(body.email);

  const newUser = new User();
  newUser.id = nextUserId;
  newUser.setName(body.name);
  newUser.setAge(body.age);
  newUser.setEmail(body.email);

  users.push(newUser);
  nextUserId++;
  return newUser;
};

const completeUpdateUserById = async (
  userId: number,
  body: UpdateUserRequest,
): Promise<User> => {
  const userToUpdate: User = await getUserById(userId);
  /**
   * Valido que el email nuevo del usuario a actualizar
   * no corresponda con el de otro usuario ya existente
   */
  if (userToUpdate.getEmail() !== body.email) {
    await checkExistUser(body.email);
  }

  userToUpdate.setName(body.name);
  userToUpdate.setEmail(body.email);
  userToUpdate.setAge(body.age);

  return userToUpdate;
};

const partialUpdateUserById = async (
  userId: number,
  body: UpdateUserRequest,
): Promise<User> => {
  const userToUpdate: User = await getUserById(userId);
  /**
   * Valido que el email nuevo del usuario a actualizar
   * no corresponda con el de otro usuario ya existente
   */

  if (body.email) {
    if (userToUpdate.getEmail() !== body.email) {
      await checkExistUser(body.email);
    }
    userToUpdate.setEmail(body.email);
  }

  if (body.name) userToUpdate.setName(body.name);
  if (body.age) userToUpdate.setAge(body.age);

  return userToUpdate;
};

const deleteUserById = async (userId: number) => {
  await getUserById(userId);
  const index = users.findIndex((user) => user.id === userId);
  users.splice(index, 1);
  return `User with id ${userId} was successfully deleted`;
};

const findUserByEmail = async (email: string): Promise<boolean> => {
  if (!email)
    throw new HttpCustomException(
      HttpStatusCode.BAD_REQUEST,
      ErrorMessage.BAD_REQUEST,
    );
  return users.some((item) => item.getEmail() === email);
};

const checkExistUser = async (email: string): Promise<void> => {
  if (!email)
    throw new HttpCustomException(
      HttpStatusCode.BAD_REQUEST,
      ErrorMessage.BAD_REQUEST,
    );

  const existUser = await findUserByEmail(email);
  if (existUser) {
    throw new HttpCustomException(
      HttpStatusCode.CONFLICT,
      ErrorMessage.EMAIL_ALREADY_IN_USE,
    );
  }
};

const userService = {
  getAllUsers,
  getUserById,
  createUser,
  completeUpdateUserById,
  partialUpdateUserById,
  deleteUserById,
};

export default userService;
