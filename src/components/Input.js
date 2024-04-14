import styled from 'styled-components';
import palette from '../styles/palette';

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  border: 2px solid #cdcdcd;
  color: ${palette.black[0]};
  font-size: 16px;

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.5);
    outline: 0;
  }
`;

export default Input;
