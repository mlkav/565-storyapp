const KEY = 'story-app-local-stories';
export const getLocalStories = () => JSON.parse(localStorage.getItem(KEY) || '[]');
export const saveStory = (story) => {
  const stories = [story, ...getLocalStories()];
  localStorage.setItem(KEY, JSON.stringify(stories));
  return story;
};
