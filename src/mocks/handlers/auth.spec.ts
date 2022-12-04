// Utils
import { server } from '../server';
import { handlers } from './auth';
import { storageKeys } from '../index';
import { storage } from '../../utils/storage';
import apiClient from '../../services/apiClient';
// Types
import { User, UserDetails } from '../../types';

describe('API.auth', () => {
  describe('on login', () => {
    it('should return token', async () => {
      // Arrange
      server.use(...handlers);
      const [userMock] = storage.getItem<User[]>(storageKeys.USERS()) ?? [];
      const [userDetailsMock] =
        storage.getItem<(UserDetails & { password: string })[]>(storageKeys.USER_DETAILS()) ?? [];
      const payload = { email: userMock.email, password: userDetailsMock.password };
      const tokenMock = { userId: userMock.id, token: userMock.id };

      // Act
      const data = await apiClient.auth.login(payload);

      // Assert
      expect(data).toEqual(tokenMock);
    });
  });
});
