/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import IconBox from '../../../../components/IconBox';
import EditCommentIcon from '../../../../img/EditCommentIcon';
import palette from '../../../../styles/palette';
import { deleteComment } from '../../../../axios/commentsAxios';
import queryKeys from '../../../../constants/queryKeys';

function DetailCommentPopup({ handleEditButtonClick, commentId }) {
  const [onPopOver, setOnPopOver] = useState(false);
  const [isActive, setIsActive] = useState('수정');
  const popupRef = useRef();
  const { id: postId } = useParams();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOnPopOver(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  const queryClient = useQueryClient();
  const { mutate: handleDeleteComment } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.comments(postId));
    },
  });

  return (
    <PopupLayout>
      <EditButtonBox onClick={() => setOnPopOver(!onPopOver)}>
        <EditCommentIcon />
      </EditButtonBox>
      <div ref={popupRef}>
        {onPopOver && (
          <PopupBox>
            <PopupButton
              type="button"
              onClick={handleEditButtonClick}
              onMouseOver={() => setIsActive('수정')}
              $active={isActive === '수정'}
            >
              수정
            </PopupButton>
            <PopupButton
              onClick={() => handleDeleteComment({ postId, commentId })}
              onMouseOver={() => setIsActive('삭제')}
              $active={isActive === '삭제'}
            >
              삭제
            </PopupButton>
          </PopupBox>
        )}
      </div>
    </PopupLayout>
  );
}

export default DetailCommentPopup;

const PopupLayout = styled.div`
  position: relative;
`;

const EditButtonBox = styled(IconBox)`
  min-width: 24px;
  max-width: 24px;
  height: 24px;
`;

const PopupBox = styled.div`
  box-sizing: border-box;
  min-width: 180px;
  min-height: 40px;
  padding: 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 24px;
  top: 12px;
  z-index: 2;
`;

const PopupButton = styled.button`
  height: 36px;
  width: 100%;
  padding: 0 8px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  background: ${({ $active }) => ($active ? palette.gray[2] : 'none')};
  cursor: pointer;
`;
