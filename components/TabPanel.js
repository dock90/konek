import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const TabPanel = props => {
  const { children, value, index } = props;

  if (value !== index) return null;
  return (
    <Typography component="div" role="tabpanel">
      {children}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number,
  value: PropTypes.number
};

TabPanel.defaultProps = {
  index: 1,
  value: 1
};

export default TabPanel;
