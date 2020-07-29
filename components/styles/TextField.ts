import styled from 'styled-components';
import { TextField as BaseTextField } from '@material-ui/core';

export const TextField = styled(BaseTextField).attrs({
  variant: 'outlined',
})`
  width: 100%;
  // Make the helper text wrap on line breaks.
  .MuiFormHelperText-root {
    white-space: pre-line;
  }
`;
