import algoliaSearch from "algoliasearch/lite";
import { Hits, InstantSearch } from "react-instantsearch-dom";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useRef, useState } from "react";
import { ME_QUERY } from "../../queries/MeQueries";

import { Popper, ClickAwayListener, Paper } from "@material-ui/core";

import SearchBox from "./SearchBox";
import ContactResult from "./ContactResult";

const ResultsContainer = styled(Paper)`
  max-width: 550px;
  min-width: 100px;
  padding: 10px;
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
          >
            <ResultsContainer>
              <Hits hitComponent={ContactResult} />
            </ResultsContainer>
          </Popper>
        </InstantSearch>
      </div>
    </ClickAwayListener>
  );
};

export default Search;
