import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  return response.data;
};

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/users/register', { username, email, password });
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateUserStats = async (exp: number, coins: number) => {
  const response = await api.put('/users/update-stats', { exp, coins });
  return response.data;
};

export const getQuests = async () => {
  const response = await api.get('/quests');
  return response.data;
};

export const completeQuest = async (questId: string) => {
  const response = await api.post(`/quests/${questId}/complete`);
  return response.data;
};

export const getAchievements = async () => {
  const response = await api.get('/achievements');
  return response.data;
};

export const unlockAchievement = async (achievementId: string) => {
  const response = await api.post(`/achievements/${achievementId}/unlock`);
  return response.data;
};

export default api;
