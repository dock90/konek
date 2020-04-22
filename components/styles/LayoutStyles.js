import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
`;

export const VCentered = styled(FlexContainer).attrs(props => ({
  children: <div>{props.children}</div>
}))`
  align-items: center;
  height: 100%;
`;
