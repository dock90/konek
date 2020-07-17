import styled from 'styled-components';

const BaseMessage = styled.div`
  padding: 5px;
  margin-bottom: 1em;
  font-weight: bold;
  font-size: 1.2em;
  color: ${props => props.theme.white};
  width: 100%;
  border-radius: 3px;
  white-space: pre-wrap;
  text-align: center;
`;

export const SuccessMessage = styled(BaseMessage)`
  background-color: ${props => props.theme.success};
`;

export const ErrorMessage = styled(BaseMessage)`
  background-color: ${props => props.theme.error};
`;
