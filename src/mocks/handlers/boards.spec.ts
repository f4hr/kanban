import { server } from '../server';
import { handlers } from './boards';
import apiClient from '../../services/apiClient';
import { usersMock, boardsMock, boardDetailsMock } from '../index';

const [user] = usersMock;

describe.skip('API.boards', () => {
  describe('on get boards', () => {
    it('should return boards', async () => {
      // Arrange
      server.use(...handlers);
      const expected = { boards: boardsMock };

      // Act
      const data = await apiClient.boards.getAll(user.id);

      // Assert
      expect(data).toEqual(expected);
    });
  });

  describe('on get board', () => {
    it('should return board', async () => {
      // Arrange
      server.use(...handlers);
      const expected = boardDetailsMock[0];

      // Act
      const data = await apiClient.boards.getById(expected.boardId);

      // Assert
      expect(data).toEqual(expected);
    });
  });

  describe('on create board', () => {
    it('should return new board', async () => {
      // Arrange
      server.use(...handlers);
      const payload = { name: 'Test' };

      // Act
      const data = await apiClient.boards.create(payload);

      // Assert
      expect(data).toHaveProperty('name', payload.name);
    });
  });

  describe('on update board', () => {
    it('should return successful response', async () => {
      // Arrange
      server.use(...handlers);
      const payload = { id: boardsMock[0].id, name: 'Test' };

      // Act
      const updatedBoard = await apiClient.boards.update(payload);

      // Act and Assert
      expect(updatedBoard).toHaveProperty('name', payload.name);
    });
  });

  describe('on delete board', () => {
    it('should return successful response', async () => {
      // Arrange
      server.use(...handlers);
      const payload = boardsMock[0].id;

      // Act and Assert
      await expect(apiClient.boards.delete(payload)).resolves.toBeUndefined();
    });
  });
});
