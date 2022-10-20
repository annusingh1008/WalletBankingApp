const getLocal = (key) => {
  return localStorage.getItem(key);
};

export const getUserEmail = (email) => {
  return getLocal(email);
};
