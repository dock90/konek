import PropTypes from 'prop-types';
import { connectSearchBox, PoweredBy } from 'react-instantsearch-dom';
import styled from 'styled-components';
// material
import { Search } from '@material-ui/icons';

// components
import { StyledInput } from '../material/StyledInput';

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

  // Defining these here so that we don't have to import the whole instantsearch CSS file when
  // this is the only thing we're using.
  .ais-PoweredBy {
    display: flex;
    align-items: center;
  }

  .ais-PoweredBy-logo {
    display: block;
    height: 1.2em;
    width: auto;
  }
  .ais-PoweredBy-text {
    padding-right: 0.25rem;
  }
`;

const SearchBox = connectSearchBox(
  ({ close, open, refine, currentRefinement }) => {
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
  }
);

SearchBox.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
};

export default SearchBox;
