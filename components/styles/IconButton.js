import styled from "styled-components";
import { IconButton } from "@material-ui/core";

export const BaseIconButton = styled(IconButton)`
  && {
    border: 1px solid ${props => props.theme.primary};
    padding: 6px;
    margin: 3px;
    .MuiSvgIcon-root {
      font-size: 1.75rem;
    }
  }
`;
