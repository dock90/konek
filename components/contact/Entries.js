import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { ENTRIES_QUERY } from '../../queries/EntryQueries';
// components
import EntryList from './EntryList';
import Loading from '../Loading';
import { ContactContext } from '../../contexts/ContactContext';

const NoneFound = styled.div.attrs(() => ({
  children: 'None found',
}))`
  text-align: center;
  font-size: 1.3em;
  font-style: italic;
  color: ${(props) => props.grayer};
  margin-top: 15px;
`;

const Entries = ({ type, header }) => {
  const { contactId } = useContext(ContactContext);
  const { loading, error, data } = useQuery(ENTRIES_QUERY, {
    variables: { contactId, type },
  });

  return (
    <div>
      {header}
      {(() => {
        if (loading) return <Loading />;
        if (error) return <p>{error.toString()}</p>;
        return data.entries.data.length > 0 ? (
          <EntryList entries={data.entries} />
        ) : (
          <NoneFound />
        );
      })()}
    </div>
  );
};

Entries.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.element,
};

export default Entries;
