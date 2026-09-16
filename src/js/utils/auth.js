const TOKEN_KEY = 'story-app-token';
const USER_KEY = 'story-app-user';

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
};
export const isAuthenticated = () => Boolean(getAuthToken());
export const setSession = (token, name) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify({ name }));
};
export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
