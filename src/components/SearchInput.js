import React from 'react';
import styled from 'styled-components';
// material
import SearchIcon from '@material-ui/icons/Search';

// components
import { StyledInput } from './StyledInput';

// styles
const Layout = styled.div`
  display: flex;
  align-items: center;
  background: #c6c6c6;
  border-radius: 4px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 0.2rem;
`;

const SearchInput = () => (
  <Layout>
    <SearchIcon color="disabled" />
    <StyledInput disableUnderline placeholder="Search" />
  </Layout>
);

export default SearchInput;
