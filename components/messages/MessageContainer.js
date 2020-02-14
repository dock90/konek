import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useContext, useEffect, useRef, useState } from "react";
import { MESSAGES_QUERY } from "../../queries/MessagesQueries";
import { RoomContext } from "../../contexts/RoomContext";
// components
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Loading from "../Loading";
import InfiniteScroll from "react-infinite-scroller";
import MessageItem from "./MessageItem";

const Container = styled.div`
  grid-area: messages;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  flex-grow: 0;
  height: 5rem;
  background-color: white;
`;

const MLWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  background-color: #f4f6f8;
  position: relative;
`;

const MLContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  //display: flex;
`;

const Beginning = styled.div`
  text-align: center;
  font-style: italic;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  width: 75%;
  color: gray;
  border-bottom: 1px solid lightgray;
  padding-bottom: 3px;
  align-self: center;
`;

const Input = styled.div`
  flex-grow: 0;
  margin-top: 0.5rem;
  width: 100%;
  border-top: solid 2px #bbbbbb;
  background-color: whitesmoke;
  padding: 5px;
`;

const Information = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const MessageContainer = () => {
  const roomContext = useContext(RoomContext);
  const roomId = roomContext.room ? roomContext.room.roomId : null;
  const variables = {
    roomId: roomId,
    after: null
  };
  const { loading, error, data, fetchMore } = useQuery(MESSAGES_QUERY, {
    variables,
    // Don't execute if we don't have a room id.
    skip: !roomId
  });

  const [isAtBottom, setIsAtBottom] = useState(true);
  // A lock to prevent multiple simultaneous calls to `loadMore`.
  const [isLoadingMore, setIsLoadingMore] = useState(loading);

  const eomRef = useRef();
  useEffect(() => {
    if (!eomRef.current || !isAtBottom) {
      return;
    }
    eomRef.current.scrollIntoView({ behavior: "auto" });
  }, [data, isAtBottom]);

  if (!roomId) {
    return <Information>Select a conversation to display details</Information>;
  }

  let hasMore = true;

  const loadMore = async () => {
    if (isLoadingMore) {
      return;
    }
    if (data) {
      variables.after = data.messages.pageInfo.endCursor;
    }
    setIsLoadingMore(true);
    await fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult: results }) => {
        if (!results || results.messages.data.length === 0) {
          hasMore = false;
          return prev;
        }

        hasMore = results.messages.pageInfo.hasNextPage;

        results.messages.data = [
          ...prev.messages.data,
          ...results.messages.data
        ];

        return results;
      }
    });
    setIsLoadingMore(false);
  };

  const handleScroll = e => {
    setIsAtBottom(
      e.target.scrollHeight - e.target.scrollTop - 10 <= e.target.clientHeight
    );
  };

  if (error) {
    return <Information>{error}</Information>;
  }

  const loadingContent = (
    <Information key={"loader"}>
      <Loading />
    </Information>
  );

  if (loading || !data || !data.messages.data.length) {
    return loadingContent;
  }

  let messages = [];
  if (data) {
    messages = [...data.messages.data].reverse();
    hasMore = data.messages.pageInfo.hasNextPage;
  }

  return (
    <Container>
      <MLWrapper>
        <MLContainer onScroll={handleScroll}>
          <InfiniteScroll
            loader={loadingContent}
            useWindow={false}
            initialLoad={true}
            isReverse={true}
            loadMore={loadMore}
            hasMore={hasMore}
            // There _may_ be a better way to do this, but this works. I tried using the `element` prop of the
            // InfiniteScroller, but it doesn't work with styled components for some reason.
            style={{
              minHeight: "100%",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "column"
            }}
          >
            {!hasMore && (
              <Beginning>Beginning of chat</Beginning>
            )}
            {messages.map(m => (
              <MessageItem message={m} key={m.messageId} />
            ))}
          </InfiniteScroll>
          <div ref={eomRef} />
        </MLContainer>
      </MLWrapper>
      <InputWrapper>
        <Input>
          <MessageInput roomId={roomContext.room.roomId} />
        </Input>
      </InputWrapper>
    </Container>
  );
};

export default MessageContainer;
