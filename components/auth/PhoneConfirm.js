import PropTypes from "prop-types";
import { H1 } from "../styles/Typography";

const PhoneConfirm = ({ confirmationCode }) => {
  return (
    <>
      <H1>Phone Confirmation</H1>
      {confirmationCode}
    </>
  );
};

PhoneConfirm.propTypes = {
  confirmationCode: PropTypes.string.isRequired
};

export default PhoneConfirm;
