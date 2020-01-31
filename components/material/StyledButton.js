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

const BorderButton = styled(BaseButton)({
  border: '1px solid #3F51B5',
});

export { BaseButton, BorderButton, StyledButton };
