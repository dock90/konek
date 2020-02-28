import styled from "styled-components";
import { connectHits } from "react-instantsearch-dom";
import PropTypes from "prop-types";

const TypeHeader = styled.div`
  font-weight: bold;
  border-bottom: 2px solid gray;
`;

const ResultList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const NoResults = styled.div`
  text-align: center;
  font-style: italic;
`;

const Results = connectHits(props => {
  const hideEmpty = props.hideEmpty !== undefined ? props.hideEmpty : true;
  if (props.hits.length === 0 && hideEmpty) {
    return <span />;
  }
  return (
    <>
      <TypeHeader>{props.header}</TypeHeader>
      <ResultList>
        {props.hits.length === 0 && <NoResults>No matches found</NoResults>}
        {props.hits.map(hit => (
          <li key={hit.objectID}>
            <props.component hit={hit} />
          </li>
        ))}
      </ResultList>
    </>
  );
});

Results.propTypes = {
  header: PropTypes.string.isRequired,
  hits: PropTypes.array.isRequired,
  component: PropTypes.func.isRequired,
  hideEmpty: PropTypes.bool
};

export default Results;
