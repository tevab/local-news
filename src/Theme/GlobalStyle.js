import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${props => props.bgImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    height: 100vh
  }
`;
 
export default GlobalStyle;