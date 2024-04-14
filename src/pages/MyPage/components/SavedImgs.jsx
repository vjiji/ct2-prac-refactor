/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import IconBox from '../../../components/IconBox';
import Imageboard from '../../../shared/Imageboard/Imageboard';
import { SortIcon, PlusIcon } from '../../../img/HeaderIcons';
import useGetPins from '../../../customHooks/useGetPins';

function SavedImgs() {
  const { userId } = useParams();
  const { pins } = useGetPins(userId);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const urls = pins.post?.map((post) => post.url);
    setImageUrls(urls);
  }, [pins]);

  if (!imageUrls) return null;

  return (
    <>
      <SavedIcons>
        <IconBox>
          <SortIcon />
        </IconBox>
        <IconBox>
          <PlusIcon />
        </IconBox>
      </SavedIcons>
      {!!imageUrls.length && (
        <Wrapper>
          <Container className="mainboard">
            <Imageboard fetchedPosts={pins.post} imageUrls={imageUrls} />
          </Container>
        </Wrapper>
      )}
    </>
  );
}

const SavedIcons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: center;
`;

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

export default SavedImgs;
