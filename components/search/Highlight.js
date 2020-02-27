import styled from "styled-components";
import { connectHighlight } from "react-instantsearch-dom";

const Highlighted = styled.span`
  background-color: yellow;
`;

const highlighter = (part, index) => {
  return part.isHighlighted ? (
    <Highlighted key={index}>{part.value}</Highlighted>
  ) : (
    <span key={index}>{part.value}</span>
  )
};

const HighlightComponent = ({ highlight, attribute, hit, isSnippet }) => {
  if (isSnippet === undefined) {
    isSnippet = false;
  }

  const parsedHit = highlight({
    highlightProperty: isSnippet ? "_snippetResult" : "_highlightResult",
    attribute,
    hit
  });

  return (
    <span>
      {parsedHit.map((part, index) =>
        Array.isArray(part) ? (
          <span key={index}>
            {part.map((partPart, partIndex) => highlighter(partPart, partIndex))}
            <br />
          </span>
        ) : (
          highlighter(part, index)
        )
      )}
    </span>
  );
};

const Highlight = connectHighlight(HighlightComponent);

export default Highlight;
