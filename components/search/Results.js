import styled from "styled-components";
import { connectHits } from "react-instantsearch-dom";
import PropTypes from "prop-types";

export const TypeHeader = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  border-bottom: 2px solid gray;
`;

export const ResultList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Hits = props => {
  if (props.hits.length === 0) {
    return <span />;
  }
  return (
    <>
      <TypeHeader>{props.header}</TypeHeader>
      <ResultList>
        {props.hits.map(hit => (
          <li key={hit.objectID}>
            <props.component hit={hit} />
          </li>
        ))}
      </ResultList>
    </>
  );
};

Hits.propTypes = {
  header: PropTypes.string.isRequired,
  hits: PropTypes.array.isRequired,
  component: PropTypes.func.isRequired
};

const Results = connectHits(Hits);

export default Results;
