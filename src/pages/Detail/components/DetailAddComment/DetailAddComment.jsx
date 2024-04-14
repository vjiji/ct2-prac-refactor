/* eslint-disable react/style-prop-object */
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import palette from '../../../../styles/palette';
import likeIcon from '../../../../img/likeIcon.svg';
import likeSelectedIcon from '../../../../img/likeSelectedIcon.svg';
import AddCommentIcon from '../../../../img/AddCommentIcon';
import { addComment, getComments } from '../../../../axios/commentsAxios';
import { addLike } from '../../../../axios/likeAxios';
import queryKeys from '../../../../constants/queryKeys';
import Profile from '../../../../components/Profile';
import { useUser } from '../../../../customHooks/useUserContext';
import { getPostDetail } from '../../../../axios/postsAxios';

function DetailAddComment() {
  const { user } = useUser();
  const [isLike, setIsLike] = useState(true);
  const { id: postId } = useParams();
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const { data: comments } = useQuery({ queryKey: queryKeys.comments(postId), queryFn: () => getComments(postId) });

  const { mutate: handleAddComment } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries(queryKeys.comments(postId));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddComment({ postId, comment });
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['likes'],
    queryFn: () => getPostDetail(postId),
  });

  const addLikesMutation = useMutation({
    mutationFn: addLike,
    onSuccess: async () => {
      queryClient.invalidateQueries(queryKeys.postDetail(postId));
    },
  });

  const handleLikeClick = async () => {
    setIsLike(!isLike);
    addLikesMutation.mutate(postId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching choi data</div>;
  }

  console.log('choi data', data);

  return (
    <DetailAddCommentLayout>
      <CommentBox>
        <CountBox $isLike={isLike}>
          <h3>댓글 {comments?.length}개</h3>
          <div>
            <img src={likeSelectedIcon} alt="likeCount" />
            <LikesCnt>{data.likes.length}</LikesCnt>
            <button type="button" onClick={handleLikeClick}>
              <img src={isLike ? likeIcon : likeSelectedIcon} alt="like" />
            </button>
          </div>
        </CountBox>
        <InputBox onSubmit={handleSubmit}>
          <ProfileButton num={user.userId % 10}>{user.nickname.split('')[0]}</ProfileButton>
          <label htmlFor="comment-input">
            <input
              id="comment-input"
              value={comment}
              autoComplete="off"
              onChange={(e) => setComment(e.currentTarget.value)}
            />
            <ButtonBox type="submit" $active={comment}>
              <AddCommentIcon />
            </ButtonBox>
          </label>
        </InputBox>
      </CommentBox>
    </DetailAddCommentLayout>
  );
}

export default DetailAddComment;

const LikesCnt = styled.div`
  margin: 0px 20px 0px 8px;
  align-items: center;
  font-weight: 500;
`;

const DetailAddCommentLayout = styled.div`
  border-radius: 0 0 32px 0;
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

const CommentBox = styled.div`
  box-sizing: border-box;
  padding: 8px 32px;
  border-top: 1px solid ${palette.gray[1]};
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const CountBox = styled.div`
  height: 44px;
  margin: 4px 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
  }

  button {
    min-width: 48px;
    min-height: 48px;
    border: none;
    border-radius: 24px;
    background: ${({ $isLike }) => ($isLike ? palette.gray[2] : palette.red[4])};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const InputBox = styled.form`
  margin-bottom: 12px;
  display: flex;
  align-items: flex-end;

  gap: 8px;

  label {
    border-radius: 24px;
    min-height: 52px;
    width: 100%;
    border: 2px solid ${palette.gray[2]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 6px 0 16px;
    cursor: pointer;
  }

  input {
    width: 260px;
    border: none;
    font-size: 16px;
    outline: none;
    cursor: pointer;

    &:focus {
      cursor: auto;
    }
  }
`;

const ProfileButton = styled(Profile)`
  margin-top: 16px;
  min-width: 48px;
`;

const ButtonBox = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 25px;
  display: ${({ $active }) => ($active ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: ${palette.red[3]};
  cursor: pointer;

  &:hover {
    background-color: ${palette.red[0]};
  }

  svg {
    fill: #fff;
  }
`;
