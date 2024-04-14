import { authInstance } from './api';

const getPosts = async () => {
  try {
    const response = await authInstance.get(`/posts`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMyImages = async () => {
  try {
    const response = await authInstance.get(`/images`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getMyPins = async (userId) => {
  try {
    const response = await authInstance.get(`/pins/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const postImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    console.log(formData);
    const response = await authInstance.post(`/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    console.log(response.data.response.imageId);
    const imageUrl = response.data.response.imageId;
    return imageUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const postPost = async (postContent) => {
  try {
    const response = await authInstance.post(`/posts`, postContent);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getPosts, getMyImages, getMyPins, postImage, postPost };
