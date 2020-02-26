import PropTypes from "prop-types";
import { connectSearchBox, PoweredBy, Hits } from "react-instantsearch-dom";
import styled from "styled-components";
// material
import { Search } from "@material-ui/icons";

// components
import { StyledInput } from "../material/StyledInput";

// styles
const Container = styled.div`
  display: flex;
  align-items: center;
  background: #c6c6c6;
  border-radius: 4px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0.2rem;
`;

const PoweredByContainer = styled.div`
  height: 1em;
  color: gray;
  font-size: 0.95rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
`;

const SearchBoxComponent = ({close, open, refine, currentRefinement}) => {
  const onKeyPress = e => {
    if (e.keyCode === 27) {
      close();
      refine('');
    } else {
      open();
    }
  };

  return (
    <Container>
      <Search color="disabled" />
      <StyledInput
        disableUnderline
        placeholder="Search"
        value={currentRefinement}
        onChange={e => refine(e.target.value)}
        onFocus={open}
        onKeyDown={onKeyPress}
      />
      <PoweredByContainer>
        <PoweredBy />
      </PoweredByContainer>
    </Container>
  );
};

SearchBoxComponent.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

const SearchBox = connectSearchBox(SearchBoxComponent);

export default SearchBox;
