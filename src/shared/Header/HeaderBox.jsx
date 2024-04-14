import { useEffect, useState } from 'react';
import styled from 'styled-components';

function HeaderBox({ children }) {
  const [isShadow, setIsShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 1) {
        setIsShadow(true);
      } else {
        setIsShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <HeaderBoxLayout className={isShadow && 'scrolled'}>{children}</HeaderBoxLayout>;
}

export default HeaderBox;

const HeaderBoxLayout = styled.div`
  display: flex;
  z-index: 99;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  background: #fff;

  &.scrolled {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 8px -8px;
    transition: box-shadow 300ms ease-in-out;
  }
`;
