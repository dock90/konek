import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const BaseButton = styled(Button)({
  marginRight: "1rem"
});

export const StyledButton = styled(Button)({
  height: 40,
  margin: 0,
  padding: 0,
  marginBottom: 30
});

export const BorderButton = styled(BaseButton)({
  border: "1px solid #3F51B5"
});
