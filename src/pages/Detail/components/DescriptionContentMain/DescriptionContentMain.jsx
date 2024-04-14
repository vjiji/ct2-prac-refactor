import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DetailComments from '../DetailComments';
import queryKeys from '../../../../constants/queryKeys';
import { getPostDetail } from '../../../../axios/postsAxios';
import Profile from '../../../../components/Profile';

function DescriptionContentMain() {
  const { id } = useParams();

  const { data: post } = useQuery({
    queryKey: queryKeys.postDetail(id),
    queryFn: () => getPostDetail(id),
    enabled: !!id,
  });

  if (!post) return null;

  const { nickname, title, content, userId } = post;

  return (
    <MainLayout>
      <ContentsBox>
        <div>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
      </ContentsBox>
      <ContentsBox />
      <ContentsBox className="detail__profile-box">
        <Link to={`/mypage/${userId}/${nickname}`}>
          <Profile num={userId % 10}>{nickname[0]}</Profile>
        </Link>
        <Link className="content__user-name" to={`/mypage/${userId}/${nickname}`}>
          {nickname}
        </Link>
      </ContentsBox>
      <ContentsBox>
        <MemoText>
          <strong>프라이빗 노트</strong>
          <p>이 핀의 어떤 점을 기억하고 싶으세요?</p>
        </MemoText>
      </ContentsBox>
      <ContentsBox>
        <p style={{ fontWeight: 600 }}>댓글</p>
      </ContentsBox>
      <DetailComments />
    </MainLayout>
  );
}

export default DescriptionContentMain;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    word-wrap: break-word;
    font-size: 28px;
    font-weight: 600;
    margin-top: 30px;
  }

  .content__user-name {
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
  }

  .detail__profile-box {
    margin: 17px 0 36px;
  }

  a {
    text-decoration: none;
    color: #000;
  }
`;

const ContentsBox = styled.div`
  max-width: 444px;
  display: flex;
  word-break: break-all;
  gap: 10px;
  align-items: center;
`;

const MemoText = styled.div`
  height: 48px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;

  strong {
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;
