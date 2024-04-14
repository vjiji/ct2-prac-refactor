import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import palette from '../../styles/palette';
import Profile from '../../components/Profile';
import { useUser } from '../../customHooks/useUserContext';

function HeaderDropDown() {
  const navigation = useNavigate();
  const { user } = useUser();

  return (
    <DropDownBox>
      <DropDown>
        <p className="dropdown__section-title">현재 로그인 계정</p>
        <ProfileBox onClick={() => navigation(`/mypage/${user.userId}/${user.nickname}`)}>
          <DropdownProfile>s</DropdownProfile>
          <ProfileTextBox>
            <h4>{user.nickname}</h4>
            <p>개인</p>
            <p>{user.email}</p>
          </ProfileTextBox>
        </ProfileBox>
        <p className="dropdown__section-title">옵션 더 보기</p>
        <PopupButton>로그아웃</PopupButton>
      </DropDown>
    </DropDownBox>
  );
}

export default HeaderDropDown;

const DropDownBox = styled.div`
  position: relative;
`;

const DropDown = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  z-index: 2;
  box-sizing: border-box;
  min-width: 180px;
  min-height: 40px;
  padding: 8px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  .dropdown__section-title {
    margin: 8px;
    font-size: 12px;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  box-sizing: border-box;
  gap: 8px;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${palette.gray[2]};
  }
`;

const DropdownProfile = styled(Profile)`
  align-items: center;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  padding-bottom: 8px;
  border-radius: 40px;
  font-size: 32px;
  font-weight: 400;
`;

const ProfileTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h4 {
    margin: 0;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${palette.gray[3]};
    font-size: 14px;
  }
`;

const PopupButton = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${palette.gray[2]};
  }
`;
