import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 기존 API 함수들
export const login = (credentials) => api.post('/users/login', credentials, { withCredentials: true });
export const getUserInfo = () => api.get('/users/profile');
export const startExam = () => api.post('/exam/start');
export const getQuestions = (examId) => api.get(`/exam/${examId}/questions`);
export const submitAnswer = (examId, questionId, answer) => 
  api.post(`/exam/${examId}/submit-answer`, { questionId, answer });

export const getExamResult = () => api.get('/exam/results/user');

export const submitStrangeExplanations = (examId, explanations) => 
  api.post(`/exam/${examId}/strange-explanations`, { explanations });

// 새로 추가된 API 함수들
export const getAllQuestions = () => api.get('/questions');
export const createQuestion = (questionData) => api.post('/questions', questionData);
export const updateQuestion = (id, questionData) => api.put(`/questions/${id}`, questionData);
export const deleteQuestion = (id) => api.delete(`/questions/${id}`);

export const getAllUsers = () => api.get('/admin/users');
export const createUser = (userData) => api.post('/admin/users', userData);
export const updateUser = (id, userData) => api.put(`/admin/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const refreshToken = async () => {
  try {
    const response = await api.post('/users/refresh-token');
    return response.data.token;
  } catch (error) {
    throw error;
  }
};

export const getAllExamResults = () => api.get('/exam/results');
export const getExamResultDetails = (examId) => {
  console.log('Requesting exam details for ID:', examId);
  return api.get(`/exam/results/${examId}`);
};

export default api;