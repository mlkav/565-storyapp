import api from './axios-instance.js';

export const getStories = () => api.get('/stories?size=100');
export const addStory = (description, photo) => {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  return api.post('/stories', formData);
};
