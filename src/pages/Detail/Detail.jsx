import styled from 'styled-components';
import DetailContents from './components/DetailContents/DetailContents';

function Detail() {
  return (
    <DetailLayout>
      <DetailContents />
      <div style={{ height: '500px' }}>더 찾아보기</div>
    </DetailLayout>
  );
}
export default Detail;

const DetailLayout = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
