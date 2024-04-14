import styled, { css } from 'styled-components';
import palette from '../styles/palette';

const Button = styled.button`
  display: inline-block;
  min-width: 60px;
  height: 52px;
  padding: 10px 20px;
  border: none;
  border-radius: 35px;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;

  ${(props) =>
    props.Red &&
    css`
      background-color: ${palette.red[3]};
      color: white;
      &:hover {
        background-color: ${palette.red[1]};
      }
    `}

  ${(props) =>
    props.LightRed &&
    css`
      height: 43px;
      margin-top: 10px;
      padding: 10px 15px;
      background-color: ${palette.red[3]};
      color: white;
      &:hover {
        background-color: ${palette.red[1]};
      }
    `}

  ${(props) =>
    props.LightGray &&
    css`
      height: 43px;
      margin-left: 10px;
      padding: 10px 15px;
      background-color: ${palette.gray[0]};
      &:hover {
        background-color: ${palette.gray[1]};
      }
    `}

  ${(props) =>
    props.Gray &&
    css`
      height: 43px;
      padding: 10px 15px;
      background-color: ${palette.gray[0]};
      &:hover {
        background-color: ${palette.gray[1]};
      }
    `}

  ${(props) =>
    props.GrayLong &&
    css`
      width: 370px;
      height: 43px;
      padding: 10px 15px;
      background-color: ${palette.gray[0]};
      &:hover {
        background-color: ${palette.gray[1]};
      }
    `}

  ${(props) =>
    props.Black &&
    css`
      background-color: white;
      &:hover {
        background-color: black;
      }
    `}
    
  ${(props) =>
    props.Blue &&
    css`
      background-color: ${palette.blue[0]};
      color: white;
    `}
`;

export default Button;
