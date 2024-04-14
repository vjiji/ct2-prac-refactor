import styled, { keyframes } from 'styled-components';

function PartFirst() {
  return (
    <PartLayout>
      <MainComment>다음</MainComment>
      <SubComment>정원 가꾸기 아이디어를 찾아보세요</SubComment>
      <ImgsPart>
        <AnimatedImgFirst src="https://i.pinimg.com/236x/f1/13/df/f113df475d4566caa0075c6729960fa3.jpg" alt="사진1" />
        <AnimatedImgSecond src="https://i.pinimg.com/236x/6a/77/ed/6a77ed2962aa7e66bac8ff727d939e96.jpg" alt="사진2" />
        <AnimatedImgThird src="https://i.pinimg.com/236x/88/05/12/8805128eef83a0d8b724567611ddf7a1.jpg" alt="사진1" />
        <AnimatedImgFourth src="https://i.pinimg.com/236x/f4/dc/58/f4dc58f3bddf1c5b5249511820246df8.jpg" alt="사진1" />
        <AnimatedImgFifth src="https://i.pinimg.com/236x/71/9a/84/719a84fd80e49047407371ef9b3c224d.jpg" alt="사진1" />
      </ImgsPart>
    </PartLayout>
  );
}

const PartLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  min-width: 1300px;
  height: 100vh;
  font-size: 60px;
  font-weight: bold;
`;

const MainComment = styled.div`
  margin: 20px;
`;

const SubComment = styled.div`
  padding-top: 0px;
  color: rgb(64, 122, 87);
`;

const ImgsPart = styled.div`
  margin: 60px 0px 100px 0px;
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px); // 시작 위치 설정
  }
  to {
    opacity: 1;
    transform: translateY(0); // 끝 위치 설정 
  }
`;

const AnimatedImgFirst = styled.img`
  margin: 10px;
  border-radius: 20px;
  opacity: 0; // 초기에 투명하게 설정
  animation: ${fadeInAnimation} 1.5s ease 0s forwards; // 0.3초 지연된 시작
`;

const AnimatedImgSecond = styled.img`
  margin: 10px;
  border-radius: 20px;
  opacity: 0;
  animation: ${fadeInAnimation} 1.5s ease 0.3s forwards;
`;

const AnimatedImgThird = styled.img`
  margin: 10px;
  border-radius: 20px;
  opacity: 0;
  animation: ${fadeInAnimation} 1.5s ease 0.6s forwards;
`;

const AnimatedImgFourth = styled.img`
  margin: 10px;
  border-radius: 20px;
  opacity: 0;
  animation: ${fadeInAnimation} 1.5s ease 0.9s forwards;
`;

const AnimatedImgFifth = styled.img`
  margin: 10px;
  border-radius: 20px;
  opacity: 0;
  animation: ${fadeInAnimation} 1.5s ease 1.2s forwards;
`;

export default PartFirst;
