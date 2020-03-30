import Router from "next/router";
import NProgress from "nprogress";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Meta from "./Meta";
import { theme } from "../config/theme";

// visualize route changes
Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

// styles
const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    font-family: 'Roboto', sans-serif;,
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
`;

const Page = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <StyledPage>
      <Meta />
      {children}
    </StyledPage>
  </ThemeProvider>
);

export default Page;
