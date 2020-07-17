import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
`;

export const JustifyRight = styled(FlexContainer)`
  justify-content: flex-end;
`;

export const VCentered = styled(FlexContainer).attrs((props) => ({
  // I'm not sure if this is necessary or not. Think about when children are text-only, not an element.
  children: <div>{props.children}</div>,
}))`
  align-items: center;
  height: 100%;
`;
