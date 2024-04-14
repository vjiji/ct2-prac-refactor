/* eslint-disable*/
import { useState } from 'react';
import Button from '../../components/Button';
import LoginSignupModal from './LoginSignupModal';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { LogoIcon } from '../../img/HeaderIcons';

function IntroHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsLogin(true);
    openModal();
  };
  const handleSignup = () => {
    setIsLogin(false);
    openModal();
  };

  return (
    <HeaderContainer>
      <IntroHeaderLayout>
        <HeaderLeft>
          <IconWrapper>
            <LogoIcon color={palette.red[3]} />
          </IconWrapper>
          <HeaderLogoBox>Pinterest </HeaderLogoBox>
          <HearderSearchBox>탐색 </HearderSearchBox>
        </HeaderLeft>
        <div>
          <HeaderChoiceBox>소개 </HeaderChoiceBox>
          <HeaderChoiceBox>비즈니스 </HeaderChoiceBox>
          <HeaderChoiceBox>언론 </HeaderChoiceBox>
          <Button LightRed type="button" onClick={handleLogin}>
            로그인
          </Button>
          <Button LightGray type="button" onClick={handleSignup}>
            가입하기
          </Button>
        </div>
      </IntroHeaderLayout>
      {isModalOpen && <LoginSignupModal closeModal={closeModal} isLogin={isLogin} setIsLogin={setIsLogin} />}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  background-color: white;
`;

const IntroHeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 20px 20px 10px;
  text-align: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  padding: 10px 10px 10px 20px;
`;

const IconWrapper = styled.div`
  padding-top: 5px;
`;

const HeaderLogoBox = styled.span`
  padding: 4px 10px 0px 5px;
  color: #cc0000;
  font-size: 20px;
  font-weight: 600;
`;

const HearderSearchBox = styled.span`
  padding: 9px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${palette.gray[0]};
  }
`;

const HeaderChoiceBox = styled.span`
  padding-right: 30px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    text-decoration-line: underline;
  }
`;

export default IntroHeader;
