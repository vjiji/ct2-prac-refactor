/* eslint-disable no-console */
import { authInstance } from './api';

const addLike = async (postId) => {
  try {
    await authInstance.post(`/posts/${postId}/likes`);
    console.log('좋아요 추가 작동');
  } catch (error) {
    console.log(error);
    console.log('좋아요 에러');
    throw error;
  }
};

const removeLike = async (postId) => {
  try {
    await authInstance.delete(`/posts/${postId}/likes`);
    console.log('좋아요 제거 작동');
  } catch (error) {
    console.log(error);
    console.log('좋아요 제거 에러');
    throw error;
  }
};

export { addLike, removeLike };
