import styled from 'styled-components';
// material
import SearchIcon from '@material-ui/icons/Search';

// components
import { StyledInput } from './material/StyledInput';

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

const SearchInput = () => (
  <Container>
    <SearchIcon color="disabled" />
    <StyledInput disableUnderline placeholder="Search" />
  </Container>
);

export default SearchInput;
