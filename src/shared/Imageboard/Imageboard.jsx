import { useEffect, useState } from 'react';
import './Imageboard.css';
import ImageCard from '../ImageCard/ImageCard';
import optimizeImage from '../ImageCard/ImageOptimization';

function Imageboard({ fetchedPosts, mainboard, imageUrls }) {
  const [optimizedImages, setOptimizedImages] = useState([]);

  useEffect(() => {
    const optimizeImages = async () => {
      const optimizedData = await Promise.all(
        imageUrls.map(async (imageUrl, index) => {
          const optimized = await optimizeImage(
            imageUrl,
            fetchedPosts[index].title,
            fetchedPosts[index].nickname,
            fetchedPosts[index].postId,
            fetchedPosts[index].userId,
          );
          return optimized;
        }),
      );
      setOptimizedImages(optimizedData);
    };

    optimizeImages();
  }, [imageUrls, fetchedPosts]);

  return (
    <>
      {Array.from(optimizedImages.values()).map((optimizedData) => (
        <ImageCard optimizedData={optimizedData} mainboard={mainboard} key={optimizedData.postId} />
      ))}
    </>
  );
}

export default Imageboard;
