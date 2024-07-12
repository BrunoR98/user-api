import request from 'supertest';
import app from '../../app';
import userService from '../../services/userService';
import userMocks from '../mocks/user/user.mock';
import userErrorMock from '../mocks/user/userError.mock';

jest.mock('../../../src/services/userService');

describe('User Controller Test', () => {
  describe('GET /users', () => {
    it('should return an error for empty users list', async () => {
      (userService.getAllUsers as jest.Mock).mockRejectedValue(
        userErrorMock.emptyUserListError,
      );

      const response = await request(app).get('/users');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 404);
      expect(response.body).toHaveProperty('message', 'Users list is empty');
    });

    it('should check the length of the users array', async () => {
      (userService.getAllUsers as jest.Mock).mockResolvedValue(
        userMocks.validUsersResponsesMocks,
      );

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
    });
  });

  describe('GET /users/:userId', () => {
    it('should return an error for user not found', async () => {
      (userService.getUserById as jest.Mock).mockRejectedValue(
        userErrorMock.userNotFoundError,
      );

      const response = await request(app).get('/users/1');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });

    it('should return an user with id 3', async () => {
      (userService.getUserById as jest.Mock).mockResolvedValue(
        userMocks.validUsersResponsesMocks[2],
      );

      const response = await request(app).get('/users/3');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        'id',
        userMocks.validUsersResponsesMocks[2].id,
      );
      expect(response.body).toHaveProperty(
        'name',
        userMocks.validUsersResponsesMocks[2].name,
      );
      expect(response.body).toHaveProperty(
        'email',
        userMocks.validUsersResponsesMocks[2].email,
      );
      expect(response.body).toHaveProperty(
        'age',
        userMocks.validUsersResponsesMocks[2].age,
      );
    });
  });

  describe('POST /users', () => {
    it('should create an user and check response fields', async () => {
      (userService.createUser as jest.Mock).mockResolvedValue(
        userMocks.validUsersResponsesMocks[0],
      );

      const response = await request(app)
        .post('/users')
        .send(userMocks.validUsersRequestMocks[0]);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        'id',
        userMocks.validUsersResponsesMocks[0].id,
      );
      expect(response.body).toHaveProperty(
        'name',
        userMocks.validUsersResponsesMocks[0].name,
      );
      expect(response.body).toHaveProperty(
        'email',
        userMocks.validUsersResponsesMocks[0].email,
      );
      expect(response.body).toHaveProperty(
        'age',
        userMocks.validUsersResponsesMocks[0].age,
      );
    });

    it('should return 400 for validation errors', async () => {
      (userService.createUser as jest.Mock).mockResolvedValue(
        userErrorMock.validationExtraIdPropError,
      );

      const response = await request(app)
        .post('/users')
        .send({
          id: 1,
          ...userMocks.validUsersRequestMocks[0],
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('status', 400);
      expect(response.body).toHaveProperty('message', 'Validation error');
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('PUT /users', () => {
    it('should return 400 for validation errors', async () => {
      (userService.completeUpdateUserById as jest.Mock).mockRejectedValue(
        userErrorMock.validationAgePropError,
      );

      const response = await request(app)
        .put('/users/1')
        .send({ ...userMocks.validUsersRequestMocks[0], age: -1 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual(userErrorMock.validationAgePropError);
    });
  });

  describe('DELETE /users/:userId', () => {
    it('should delete a user by ID', async () => {
      (userService.deleteUserById as jest.Mock).mockResolvedValue(
        'User with id 1 was successfully deleted',
      );

      const response = await request(app).delete('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual('User with id 1 was successfully deleted');
    });

    it('should return 404 if the user is not found', async () => {
      (userService.deleteUserById as jest.Mock).mockRejectedValue(
        userErrorMock.userNotFoundError,
      );

      const response = await request(app).delete('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 404);
      expect(response.body).toHaveProperty('message', 'User not found');
    });
  });
});
