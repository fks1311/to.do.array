import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import theme from "./theme";

export const GlobalStyle = createGlobalStyle`
  ${reset};
  body, #root {
    height:${window.innerHeight}px;
    background-color:${theme.darkmode.bg};
  }
`;
