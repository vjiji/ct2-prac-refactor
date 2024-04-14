import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import IconBox from '../../components/IconBox';
import palette from '../../styles/palette';
import { ChatIcon, DropdownIcon, LogoIcon, NoticeIcon } from '../../img/HeaderIcons';
import SearchInput from './SearchInput';
import Profile from '../../components/Profile';
import { useUser } from '../../customHooks/useUserContext';
import HeaderDropDown from './HeaderDropDown';

function Header() {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const isAddPage = pathname === '/addImage';
  const { user } = useUser();
  const [isOnToggle, setIsOnToggle] = useState();

  const handleClickToggle = () => setIsOnToggle(!isOnToggle);

  return (
    <HeaderLayout>
      <IconBox onClick={() => navigation('/main')}>
        <LogoIcon color={palette.red[3]} />
      </IconBox>
      <NaviButton onClick={() => navigation('/main')} className={!isAddPage && 'header__navi-button--selected'}>
        홈
      </NaviButton>
      <NaviButton onClick={() => navigation('/addImage')} className={isAddPage && 'header__navi-button--selected'}>
        만들기
      </NaviButton>
      <SearchInput />
      <IconBox>
        <NoticeIcon color={palette.gray[3]} />
      </IconBox>
      <IconBox>
        <ChatIcon color={palette.gray[3]} />
      </IconBox>
      <IconBox onClick={() => navigation(`/mypage/${user.userId}/${user.nickname}`)}>
        <HeaderProfile num={user.userId % 10}>{user.nickname[0]}</HeaderProfile>
      </IconBox>
      <IconStyles onClick={handleClickToggle}>
        <DropdownIcon color={palette.gray[3]} />
      </IconStyles>
      {isOnToggle && <HeaderDropDown />}
    </HeaderLayout>
  );
}

export default Header;

const HeaderLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 4px 16px;
`;

const NaviButton = styled(Button)`
  min-width: 60px;
  padding: 10px 16px;
  background: #fff;
  color: #111;
  font-size: 16px;

  &.header__navi-button--selected {
    color: #fff;
    background: ${palette.black[0]};
  }
`;

const IconStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 25px;
  cursor: pointer;

  &:hover {
    background: ${palette.gray[2]};
  }
`;

const HeaderProfile = styled(Profile)`
  width: 24px;
  height: 24px;
  font-size: 14px;
`;
