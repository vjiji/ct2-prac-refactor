const queryKeys = {
  postDetail: (postId) => [`posts.${postId}`],
  comments: (postId) => [`posts.${postId}.comments`],
  pins: (userId) => [`pins.${userId}`],
  postsByUserCreate: (userId) => [`posts.user.create.${userId}`],
};

export default queryKeys;
