import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

const NoteList = ({ notes }) => {
  const { data } = notes;
  return data.map(note => <NoteItem note={note} />);
};

NoteList.propTypes = {
  // TODO: add shape to proptype
  notes: PropTypes.object.isRequired,
};

export default NoteList;
