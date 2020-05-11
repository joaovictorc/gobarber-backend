import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

describe('should be able show the profile', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const showProfile = new ShowProfileService(fakeUsersRepository);

    const user = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Trê');
    expect(profile.email).toBe('johntre@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const showProfile = new ShowProfileService(fakeUsersRepository);

    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
