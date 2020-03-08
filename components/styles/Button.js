import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.primary ? '#4caf50' : 'none')};
  color: ${props => (props.primary ? '#FFFFFF' : '#393939')};
  padding: 6px 8px;
  text-transform: uppercase;
  border-radius: 4px;
  border: ${props => (props.primary ? '0' : '1px solid #3f51b5')};
  line-height: 1.75;
  cursor: pointer;
`;

export default Button;
