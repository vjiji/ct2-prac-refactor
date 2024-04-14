async function optimizeImage(imageUrl, title, nickname, postId, userId) {
  const img = new Image();
  img.src = imageUrl;
  await img.decode();
  const newWidth = img.naturalWidth * 0.66;
  const newHeight = img.naturalHeight * 0.66;
  const quality = 80;
  const optimizedUrl = `${imageUrl}?w=${newWidth}&h=${newHeight}&q=${quality}&fit=crop`;
  return {
    url: optimizedUrl,
    title,
    nickname,
    postId,
    userId,
  };
}

export default optimizeImage;
