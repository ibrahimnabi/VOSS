const setUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};
const removeUser = () => {
  localStorage.removeItem("user");
};
const LOCAL_STORAGE = {
  setUser,
  getUser,
  removeUser
};

export default LOCAL_STORAGE;
