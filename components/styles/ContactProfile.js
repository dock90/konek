import styled from 'styled-components';
import { Card } from '@material-ui/core';

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Name = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  h2 {
    margin: 0;
  }
`;

export const LegalName = styled.div`
  color: gray;
  font-size: 0.9em;
  font-style: italic;
`;

export const Detail = styled(Card)`
  margin-bottom: 1rem;
`;

export const BioContent = styled.div`
  white-space: pre-wrap;
`;
