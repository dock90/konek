import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const ResultContainer = styled(Paper)`
  margin: 2px;
  padding: 2px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
`;

export const ResultTitle = styled.div`
  display: flex;
  font-size: 1.1rem;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
`;

export const ResultDetail = styled.div`
  display: flex;
  font-size: 0.95rem;
`;
