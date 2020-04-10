import styled from "styled-components";
import TextField from "@material-ui/core/TextField";

export const StyledTextField = styled(TextField).attrs({
  variant: "outlined"
})`
  // Make the helper text wrap on line breaks.
  .MuiFormHelperText-root {
    white-space: pre-line;
  }
`;
