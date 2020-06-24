import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

let fakeRepository: FakeUsersRepository;
let fakeHash: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeRepository = new FakeUsersRepository();
    fakeHash = new FakeHashProvider();
    createUser = new CreateUserService(fakeRepository, fakeHash);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await createUser.execute({
      name: 'Pedro',
      email: 'hiro@gmail.com',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Pedro',
        email: 'hiro@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
