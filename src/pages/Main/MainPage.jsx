import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPosts } from '../../axios/imagesAxios';
import Imageboard from '../../shared/Imageboard/Imageboard';

function MainPage() {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPosts();
        setFetchedPosts(posts);
        const urls = posts.map((post) => post.url);
        setImageUrls(urls);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Wrapper>
      <Container className="mainboard">
        <Imageboard fetchedPosts={fetchedPosts} mainboard imageUrls={imageUrls} />
      </Container>
    </Wrapper>
  );
}

export default MainPage;

const Wrapper = styled.div`
  padding-top: 80px;
  display: block;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  height: 100%;
  margin: 0 auto;
  display: block;
  position: relative;
`;
