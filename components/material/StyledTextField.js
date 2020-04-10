import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const StyledTextField = styled(TextField).attrs({
  variant: "outlined"
})`
  width: 100%;
  // Make the helper text wrap on line breaks.
  .MuiFormHelperText-root {
    white-space: pre-line;
  }
`;
