import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Button from '../../../../components/Button';
import palette from '../../../../styles/palette';
import DescriptionContentMain from '../DescriptionContentMain';
import DetailAddComment from '../DetailAddComment';
import usePins from '../../../../customHooks/usePins';

function DescriptionContent() {
  const { id: postId } = useParams();

  const { handleSetPin, isContained } = usePins(postId);

  return (
    <DescriptionContentLayout>
      <ContentHeader>
        <HeaderButton $isContained={isContained} onClick={handleSetPin}>
          {isContained ? '저장됨' : '저장'}
        </HeaderButton>
      </ContentHeader>
      <ContentBox>
        <DescriptionContentMain />
      </ContentBox>
      <DetailAddComment />
    </DescriptionContentLayout>
  );
}

export default DescriptionContent;

const DescriptionContentLayout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 0 32px 32px 0;
  max-height: calc(100vh - 96px);
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  padding: 0 32px;
  flex: 1 1 auto;
  overflow: scroll;
`;

const ContentHeader = styled.div`
  box-sizing: border-box;
  width: 508px;
  padding: 32px 32px 0 0;
  min-height: 92px;
  border-radius: 0 32px 32px 0;
  background-color: #fff;
  position: sticky;
  top: 64px;
  display: flex;
  justify-content: flex-end;
`;

const HeaderButton = styled(Button)`
  background: ${({ $isContained }) => ($isContained ? '#000' : palette.red[3])};
  color: #fff;
`;
