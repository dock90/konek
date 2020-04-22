import styled from "styled-components";

export const VCentered = styled.div.attrs(props => ({
  children: <div>{props.children}</div>
}))`
  display: flex;
  align-items: center;
  height: 100%;
`;
