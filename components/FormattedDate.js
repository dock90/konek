import propTypes from 'prop-types';

const FormattedDate = ({ date }) => {
  const d = new Date(date),
    formatted = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);

  return <span>{formatted}</span>;
};

FormattedDate.propTypes = {
  date: propTypes.string.isRequired,
};

export default FormattedDate;
