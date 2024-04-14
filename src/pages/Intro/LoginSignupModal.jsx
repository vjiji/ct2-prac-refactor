/* eslint-disable*/
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/Button';
import { useMutation } from '@tanstack/react-query';
import { setLocalStorage } from '../../utils/storageUtils';
import LabelInput from '../../components/LabelInput';
import { signupUser, loginUser } from '../../axios/LoginSignupAxios';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { LogoIcon } from '../../img/HeaderIcons';

function LoginSignupModal({ closeModal, isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDay, setBirthday] = useState('');

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleBirthdayChange = (e) => {
    const birthDay = e.target.value;
    setBirthday(birthDay);
  };

  const validateEmail = (email) => {
    const eamilRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return eamilRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,15}$/;
    return passwordRegex.test(password);
  };

  const handleFaceBook = () => {
    window.open('https://www.facebook.com/', '_blank');
  };

  const userInfo = {
    email,
    password,
  };

  const newUserInfo = {
    email,
    password,
    birthDay,
  };

  // 회원가입 통신
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      if (data.status === 201) {
        alert('회원가입에 성공했습니다.');
        setIsLogin(true);
      }
    },
    onError: (error) => {
      console.log('data', data);
      console.log('data-body', data.body);
      alert('회원가입 실패 : ', error);
    },
  });

  // 로그인 통신
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const refreshToken = data.headers;
      const { accessToken } = data.data;
      console.log(data);
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);

      if (data.status === 200) {
        setLocalStorage(accessToken);
        /*
          setCookie('refreshToken', refreshToken);
        */
        localStorage.setItem('email', email);
        localStorage.setItem('userColorNum', Math.floor(Math.random() * 10));
        alert(`${email}님 로그인 성공!`);
        navigate('/main');
      }
    },
    onError: (error) => {
      alert('로그인 실패 : ', error);
    },
  });

  // 폼 제출
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newUserInfo);

    if (email.trim() !== '' && !validateEmail(email)) {
      alert('유효한 이메일 주소를 입력하세요.');
    }

    if (password.trimEnd() !== '' && !validatePassword(password)) {
      alert('비밀번호는 영어 대소문자와 숫자를 사용하여 6~15자로 입력하세요.');
    }

    if (isLogin) {
      // 로그인 처리
      loginMutation.mutate(userInfo);
    } else {
      // 회원가입 처리
      signupMutation.mutate(newUserInfo);
    }
  };

  return (
    <ModalWrapper>
      <ModalContent onSubmit={handleFormSubmit}>
        <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
        <IconWrapper>
          <LogoIcon color={palette.red[3]} />
        </IconWrapper>
        <WelcomComment>Pinterest에 오신 것을 환영합니다</WelcomComment>
        {!isLogin && <IdeaComment>시도해 볼만한 새로운 아이디어 찾기</IdeaComment>}
        <InputName>이메일</InputName>
        <LabelInput type="email" placeholder="이메일" value={email} onChange={handleEmailChange} />
        <InputName>비밀번호</InputName>
        <LabelInput type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
        {isLogin ? (
          <>
            <StrongComment>비밀번호를 잊으셨나요?</StrongComment>
            <Button LightRed type="submit">
              로그인
            </Button>
          </>
        ) : (
          <>
            <InputName>생년월일</InputName>
            <LabelInput type="date" value={birthDay} onChange={handleBirthdayChange} />
            <Button LightRed type="submit">
              계속하기
            </Button>
          </>
        )}

        {isLogin && (
          <>
            <OrComment>또는</OrComment>
            <Button Blue onClick={handleFaceBook}>
              Facebook으로 계속하기
            </Button>
          </>
        )}
        <ServiceComment>
          계속 진행하면 Pinterest <strong>서비스 약관에 </strong>동의하고
          <strong>
            <br />
            개인정보 보호정책
          </strong>
          을 읽었음을 인정하는 것으로 간주 됩니다. <strong>컬렉션 알림.</strong>
        </ServiceComment>
        {isLogin ? (
          <ChangeModalComment>아직 Pinterest를 사용하고 있지 않으신가요? 가입하기</ChangeModalComment>
        ) : (
          <ChangeModalComment>이미 회원이신가요? 로그인</ChangeModalComment>
        )}
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalContent = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  width: 257px;
  height: 450px;
  padding: 86px;
  border-radius: 30px;
  background-color: white;
  text-align: center;
  box-shadow: 0 0 5px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 20px;
  border: none;
  background-color: transparent;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  padding-bottom: 10px;
`;

const WelcomComment = styled.div`
  padding-bottom: 10px;
  font-size: 26px;
  font-weight: 600;
`;

const InputName = styled.div`
  text-align: left;
  padding: 10px 0px 0px 10px;
  font-size: 13px;
`;

const IdeaComment = styled.div`
  font-size: 14px;
`;

const StrongComment = styled.div`
  padding: 5px 0px 10px 0px;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
`;

const ServiceComment = styled.div`
  padding: 15px;
  font-size: 9.7px;
`;

const OrComment = styled.div`
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
`;

const FacebookLogo = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 30px;
  border: 1px solid white;
  border-radius: 100px;
`;

const ChangeModalComment = styled.div`
  font-size: 10px;
  font-weight: bold;
`;

export default LoginSignupModal;
