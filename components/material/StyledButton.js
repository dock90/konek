import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BaseButton = styled(Button)({
  height: 40,
  marginRight: '1rem',
});

const StyledButton = styled(Button)({
  height: 40,
  margin: 0,
  padding: 0,
  marginBottom: 30,
});

export { BaseButton, StyledButton };
