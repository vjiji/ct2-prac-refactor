import styled from 'styled-components';

function ImageContent({ url }) {
  return (
    <ImageContentLayout>
      <img src={url} alt="detail-visual-content" />
    </ImageContentLayout>
  );
}

export default ImageContent;

const ImageContentLayout = styled.div`
  width: 508px;
  border-radius: 32px 0px 0px 32px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
  }
`;
