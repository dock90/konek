import styled from "styled-components";
import algoliaSearch from "algoliasearch/lite";
import { InstantSearch, Index, Configure } from "react-instantsearch-dom";
import { useQuery } from "@apollo/react-hooks";
import { useRef, useState } from "react";
import { ME_QUERY } from "../../queries/MeQueries";

import { Popper, ClickAwayListener, Paper } from "@material-ui/core";

import SearchBox from "./SearchBox";
import Results from "./Results";
import ContactResult from "./ContactResult";
import EntryResult from "./EntryResult";

const ResultsContainer = styled(Paper)`
  max-width: 550px;
  min-width: 100px;
  padding: 5px;
`;

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const {
    loading,
    data: { me }
  } = useQuery(ME_QUERY);

  if (loading) {
    return;
  }

  if (!me.access.contacts) {
    // If we don't have access to contacts, we don't have any use for search.
    return;
  }

  const client = algoliaSearch(me.algoliaInfo.appId, me.algoliaInfo.searchKey);

  const handleOpen = e => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div ref={containerRef}>
        <InstantSearch searchClient={client} indexName="contacts">
          <Configure hitsPerPage={10} />
          <SearchBox open={handleOpen} close={handleClose} />
          <Popper
            id="search-results-popover"
            open={isOpen}
            onClose={handleClose}
            anchorEl={containerRef.current}
            placement="bottom"
            disablePortal={true}
            transition={true}
            modifiers={{
              flip: {
                enabled: false
              },
              preventOverflow: {
                enabled: true,
                boundariesElement: "viewport"
              }
            }}
            style={{
              zIndex: 1
            }}
          >
            <ResultsContainer>
              <Results component={ContactResult} header="Contacts" />
              <Index indexName="entries">
                <Results component={EntryResult} header="Other"/>
              </Index>
            </ResultsContainer>
          </Popper>
        </InstantSearch>
      </div>
    </ClickAwayListener>
  );
};

export default Search;
