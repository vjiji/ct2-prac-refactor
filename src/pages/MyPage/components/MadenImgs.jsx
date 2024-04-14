import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Imageboard from '../../../shared/Imageboard/Imageboard';
import queryKeys from '../../../constants/queryKeys';
import { getPostsByUser } from '../../../axios/postsAxios';

function MadenImgs() {
  const { userId } = useParams();
  const [imageUrls, setImageUrls] = useState([]);

  const { data } = useQuery({ queryKey: queryKeys.postsByUserCreate(userId), queryFn: () => getPostsByUser(userId) });

  useEffect(() => {
    const urls = data?.map((post) => post.url);
    setImageUrls(urls);
  }, [data]);

  if (!imageUrls) return null;

  return (
    <Wrapper>
      <Container className="mainboard">
        {!!imageUrls.length && <Imageboard fetchedPosts={data} imageUrls={imageUrls} />}
      </Container>
    </Wrapper>
  );
}

export default MadenImgs;

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
