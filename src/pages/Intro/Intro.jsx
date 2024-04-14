import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import IntroHeader from './IntroHeader';
import InfoArea from './InfoArea';

function Intro() {
  const DIVIDER_HEIGHT = 5;
  const PAGE_COUNT = 5;
  const outerDivRef = useRef();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight;
      const currentPage = Math.floor(scrollTop / pageHeight) + 1; // 현재 페이지 계산

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (currentPage < PAGE_COUNT) {
          // 다음 페이지로 이동
          const nextPageTop = pageHeight * currentPage + DIVIDER_HEIGHT * (currentPage - 1);
          outerDivRef.current.scrollTo({
            top: nextPageTop,
            left: 0,
            behavior: 'smooth',
          });
        }
      } else {
        // 스크롤 올릴 때
        // eslint-disable-next-line no-lonely-if
        if (currentPage > 1) {
          // 이전 페이지로 이동
          const prevPageTop = pageHeight * (currentPage - 2) + DIVIDER_HEIGHT * (currentPage - 2);
          outerDivRef.current.scrollTo({
            top: prevPageTop,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    };

    if (outerDivRef.current) {
      outerDivRef.current.addEventListener('wheel', wheelHandler);
    }

    // clean-up 함수는 이전 이벤트 리스너를 제거함
    return () => {
      if (outerDivRef.current) {
        outerDivRef.current.removeEventListener('wheel', wheelHandler);
      }
    };
  }, []); // 빈 의존성 배열을 전달하여, useEffect가 한 번만 실행되도록 함

  return (
    <IntroLayout ref={outerDivRef}>
      <IntroHeader />
      <IntroPadding>
        <InfoArea />
      </IntroPadding>
    </IntroLayout>
  );
}

const IntroLayout = styled.div`
  overflow-y: auto;
  height: 100vh;

  /* 화면에서 스크롤바 안보이게 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const IntroPadding = styled.div`
  padding-top: 93px;
`;

export default Intro;
