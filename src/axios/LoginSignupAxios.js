import { instance } from './api';

const signupUser = async (newUserInfo) => {
  try {
    const response = await instance.post('/signup', newUserInfo);
    return response;
  } catch (error) {
    console.log(error.response);
    throw error;
  }
};

const loginUser = async (userInfo) => {
  try {
    const response = await instance.post('/login', userInfo);
    return response;
  } catch (error) {
    console.log(userInfo);
    throw error;
  }
};

const logoutUser = async (refreshToken) => {
  try {
    const response = await instance.post('/logout', { refreshToken });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { signupUser, loginUser, logoutUser };
