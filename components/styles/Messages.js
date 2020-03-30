import styled from "styled-components";

export const ErrorMessage = styled.div`
  background-color: ${props => props.theme.error};
  padding: 5px;
  margin-bottom: 1em;
  font-weight: bold;
  color: ${props => props.theme.white};
  width: 100%;
  border-radius: 3px;
  white-space: pre-wrap;
  text-align: center;
`;
