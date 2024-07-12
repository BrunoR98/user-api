const validUsersRequestMocks = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 30,
  },
  {
    name: 'Carlos Zara',
    email: 'carloszara@example.com',
    age: 25,
  },
  {
    name: 'Albert Rampi',
    email: 'albertrampi@example.com',
    age: 42,
  },
];

const validUsersResponsesMocks = [
  {
    id: 1,
    ...validUsersRequestMocks[0],
  },
  {
    id: 2,
    ...validUsersRequestMocks[1],
  },
  {
    id: 3,
    ...validUsersRequestMocks[2],
  },
];

const userMocks = {
  validUsersRequestMocks,
  validUsersResponsesMocks,
};

export default userMocks;
