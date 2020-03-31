import styled from "styled-components";

export const Logo = styled.img.attrs(props => ({
  alt: "Konek Logo",
  src: "/logo-name.png"
}))`
  width: ${props => props.size ? props.size * 3.325: 133}px;
  height: ${props => props.size ? props.size : 40}px;
`;
