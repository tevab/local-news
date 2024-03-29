import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 100vh;
    display: flex;
    margin: 0;
    position: relative;
    font-family: 'Varela Round', Arial, sans-serif;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      mix-blend-mode: multiply;
      transition: all 400ms ease-in-out;
      background-color: ${props => props.loading? 'transparent' : '#7b6767'};
    }
  }
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
`;
 
export default GlobalStyle;