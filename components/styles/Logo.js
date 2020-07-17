import styled from 'styled-components';

export const Logo = styled.img.attrs((props) => ({
  alt: 'Konek Logo',
  src: '/logo-name.png',
  size: props.size ? props.size : 40,
}))`
  width: ${(props) => props.size * 3.325}px;
  height: ${(props) => props.size}px;
`;
