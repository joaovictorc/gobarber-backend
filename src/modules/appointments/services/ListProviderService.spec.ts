import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProviderService';

describe('ListProviders', () => {
  it('should be able to listthe providers', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const listProviders = new ListProvidersService(fakeUsersRepository);

    const user1 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const loggerUser = await fakeUsersRepository.create({
      name: 'João',
      email: 'joao@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggerUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
