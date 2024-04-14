/* eslint-disable no-console */
import { authInstance } from './api';

const addPin = async (postId) => {
  try {
    await authInstance.post(`/pins/${postId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPins = async (userId) => {
  try {
    const { data } = await authInstance.get(`/pins/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePin = async (postId) => {
  try {
    await authInstance.delete(`/pins/${postId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { addPin, getPins, deletePin };
