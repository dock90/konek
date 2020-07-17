import PropTypes from 'prop-types';
import NoteItem from './NoteItem';
import { TYPE_CONVERSATION, TYPE_NOTE } from '../../queries/EntryQueries';
import ConversationItem from './ConversationItem';

const EntryList = ({ entries }) => {
  const { data } = entries;
  return data.map(entry => {
    switch (entry.__typename) {
      case TYPE_NOTE:
        return <NoteItem key={entry.entryId} note={entry} />;
      case TYPE_CONVERSATION:
        return <ConversationItem key={entry.entryId} conversation={entry} />;
    }
    return null;
  });
};

EntryList.propTypes = {
  // TODO: add shape to proptype
  entries: PropTypes.object.isRequired
};

export default EntryList;
