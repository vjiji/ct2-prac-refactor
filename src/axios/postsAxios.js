/* eslint-disable no-console */
import { authInstance } from './api';

const getPostsByUser = async (userId) => {
  try {
    const { data } = await authInstance.get(`/posts/user/${userId}`);
    return data;
  } catch (error) {
    console.log('choi error');
    throw error;
  }
};

const getPostDetail = async (id) => {
  try {
    const { data } = await authInstance.get(`/posts/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getPostsByUser, getPostDetail };
