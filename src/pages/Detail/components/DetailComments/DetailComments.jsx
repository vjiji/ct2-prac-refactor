import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import queryKeys from '../../../../constants/queryKeys';
import { getComments } from '../../../../axios/commentsAxios';
import palette from '../../../../styles/palette';
import DetailCommentPopup from '../DetailCommentPopup/DetailCommentPopup';
import DetailEditComment from '../DetailEditComment';
import Profile from '../../../../components/Profile';

function DetailComments() {
  const { id: postId } = useParams();
  const [editComment, setEditComment] = useState();

  const { data: comments } = useQuery({
    queryKey: queryKeys.comments(postId),
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });

  const handleEditComment = (commentId) => {
    setEditComment(commentId);
  };

  const handleCancelEdit = () => {
    setEditComment('');
  };

  if (!comments) return <EmptyText>아직 댓글이 없습니다! 대화를 시작하려면 하나를 추가하세요.</EmptyText>;

  return (
    <DeatailCommentsLayout>
      {comments.map(({ nickname, content, commentId, userId }) => (
        <CommentBox key={commentId}>
          {editComment === commentId ? (
            <DetailEditComment selectedComment={content} commentId={commentId} handleCloseEditBox={handleCancelEdit} />
          ) : (
            <>
              <Link to={`/mypage/${userId}/${nickname}`}>
                <CommentProfile num={userId % 10}>{nickname[0]}</CommentProfile>
              </Link>
              <div>
                <TextBox>
                  <Link to={`/mypage/${userId}/${nickname}`}>
                    <strong>{nickname}</strong>
                  </Link>
                  <p>{content}</p>
                </TextBox>
                <DetailCommentPopup handleEditButtonClick={() => handleEditComment(commentId)} commentId={commentId} />
              </div>
            </>
          )}
        </CommentBox>
      ))}
    </DeatailCommentsLayout>
  );
}

export default DetailComments;

const EmptyText = styled.p`
  margin-top: 8px;
  color: ${palette.gray[3]};
`;

const DeatailCommentsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CommentBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  margin-top: 8px;

  strong {
    font-weight: 600;
  }

  p {
    margin: 0;
  }
`;

const CommentProfile = styled(Profile)`
  width: 32px;
  height: 32px;
  font-weight: 400;
  padding-bottom: 4px;
  box-sizing: border-box;
`;
