import styled from "styled-components";
import algoliaSearch from "algoliasearch/lite";
import { InstantSearch, Index, Configure } from "react-instantsearch-dom";
import { MeContext } from "../../contexts/MeContext";

import { useContext, useRef, useState } from "react";

import { ClickAwayListener, Paper } from "@material-ui/core";
import SearchBox from "./SearchBox";
import Results from "./Results";
import ContactResult from "./ContactResult";
import EntryResult from "./EntryResult";

const SearchResults = styled.div`
  position: absolute;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transition: opacity 150ms ease-in-out,
    visibility 0s linear ${props => (props.isOpen ? '0s' : "150ms")};
  // Required so it is on top of other stuff.
  z-index: 2000;
`;
const ResultsContainer = styled(Paper)`
  max-width: 550px;
  min-width: 100px;
  padding: 5px;
`;

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { algoliaInfo, access } = useContext(MeContext);

  if (!access.contacts) {
    // If we don't have access to contacts, we don't have any use for search.
    return null;
  }

  const client = algoliaSearch(algoliaInfo.appId, algoliaInfo.searchKey);

  const handleOpen = e => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  /**
   * Have to disable portal so that the "ClickAwayListener" works for the search result content.
   */
  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <InstantSearch searchClient={client} indexName="contacts">
          <Configure hitsPerPage={10} />
          <SearchBox open={handleOpen} close={handleClose} />
          <SearchResults isOpen={isOpen}>
            <ResultsContainer>
              <Results
                component={ContactResult}
                header="Contacts"
                hideEmpty={false}
              />
              <Index indexName="entries">
                <Results
                  component={EntryResult}
                  header="Other"
                  hideEmpty={true}
                />
              </Index>
            </ResultsContainer>
          </SearchResults>
        </InstantSearch>
      </div>
    </ClickAwayListener>
  );
};

export default Search;
