import { ApiError } from '../types';

const isTestEnv = () => process.env.NODE_ENV === 'test';

export const ms = (delay = 300) => (isTestEnv() ? 0 : delay);

export const isStringEmpty = (value: string) => value == null || value === '';

export const getToken = (authHeader: string) => authHeader.split(' ')[1];

type HttpCodes = 400 | 401 | 404 | 500;
export const generateApiError = (code: HttpCodes, message?: string): ApiError => {
  switch (code) {
    case 400:
      return {
        statusCode: code,
        error: 'Bad Request',
        message: message || 'Bad request',
      };
    case 404:
      return {
        statusCode: code,
        error: 'Not Found',
        message: message || 'Not found',
      };
    case 500:
      return {
        statusCode: code,
        error: 'Server Error',
        message: message || 'Server error',
      };
    default:
      throw new Error(`Unknown error code "${code}"`);
  }
};
