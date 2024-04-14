/* eslint-disable no-console */
import { authInstance } from './api';

const addComment = async ({ postId, comment }) => {
  try {
    await authInstance.post(`/posts/${postId}/comments`, { content: comment });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getComments = async (postId) => {
  try {
    const { data } = await authInstance.get(`/posts/${postId}/comments`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const editComment = async ({ postId, commentId, comment }) => {
  try {
    await authInstance.put(`/posts/${postId}/comments/${commentId}`, { content: comment });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteComment = async ({ postId, commentId }) => {
  console.log(commentId);
  try {
    await authInstance.delete(`/posts/${postId}/comments/${commentId}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { addComment, getComments, editComment, deleteComment };
