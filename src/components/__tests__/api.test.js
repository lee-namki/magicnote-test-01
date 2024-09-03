import axios from 'axios';
import { login, getQuestions } from '../api';

jest.mock('axios');

describe('API functions', () => {
  test('login makes a POST request to /login', async () => {
    const mockResponse = { data: { token: 'fake-token' } };
    axios.post.mockResolvedValue(mockResponse);

    const credentials = { username: 'testuser', password: 'password123' };
    const response = await login(credentials);

    expect(axios.post).toHaveBeenCalledWith('/login', credentials);
    expect(response).toEqual(mockResponse);
  });

  test('getQuestions makes a GET request to /questions', async () => {
    const mockResponse = { data: [{ id: 1, text: 'Test question' }] };
    axios.get.mockResolvedValue(mockResponse);

    const response = await getQuestions();

    expect(axios.get).toHaveBeenCalledWith('/questions');
    expect(response).toEqual(mockResponse);
  });
});