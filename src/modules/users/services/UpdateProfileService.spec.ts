import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

describe('should be able update the profile', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'j.victor11@live.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'teste@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'j.victor11@live.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'j.victor12@live.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'j.victor11@live.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'j.victor11@live.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'j.victor11@live.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'j.victor11@live.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'j.victor11@live.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'j.victor11@live.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'j.victor11@live.com',
        old_password: '1223',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
