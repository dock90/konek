import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const ResultContainer = styled(Paper)`
  margin: 2px;
  padding: 2px;

  display: flex;
  justify-content: space-between;

  cursor: pointer;
  &.MuiPaper-root {
    // Have to over-ride the default transition.
    transition: background-color 150ms linear;
  }

  :hover {
    background-color: lightgray;
    //transition: background-color 150ms linear;
  }
`;

export const ResultTitle = styled.div`
  display: flex;
  font-size: 1.5rem;
  flex-direction: ${props => (props.direction ? props.direction : "row")};
`;

export const ResultDetail = styled.div`
  display: flex;
  font-size: 1rem;
  margin-left: .5rem;
`;
