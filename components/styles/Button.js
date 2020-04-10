import styled from "styled-components";
import { Button } from "@material-ui/core";

export const BaseButton = styled(Button)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => (props.primary ? props.theme.primary : "none")};
    color: ${props => (props.primary ? props.theme.white : props.theme.black)};
    margin-right: 1rem;

    border: 1px solid ${props => props.theme.primary};

    :hover {
      background-color: ${props =>
        props.primary ? props.theme.primaryDarker : props.theme.light};
    }

    :disabled {
      background-color: ${props => (props.primary ? props.theme.gray : "none")};
      border-color: ${props => (props.primary ? props.theme.grayer : "none")};
    }
  }
`;

export const DeleteButton = styled(BaseButton)`
  &&,
  &&:hover {
    background-color: ${props => props.theme.error};
    color: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.black};
  }
`;

export const BigButton = styled(BaseButton)`
  && {
    height: 40px;

    margin: 0;
    padding: 0;
    font-size: 1.3rem;
  }
`;
