import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { useContext, useEffect, useRef, useState } from 'react';
import { MESSAGES_QUERY } from '../../queries/MessagesQueries';
import { RoomIdContext } from '../../contexts/RoomIdContext';
// components
import { Chip } from '@material-ui/core';
import MessageInput from './MessageInput';
import Loading from '../Loading';
import InfiniteScroll from 'react-infinite-scroller';
import MessageItem from './MessageItem';
import { ROOM_QUERY } from '../../queries/RoomQueries';
import { markAllRead } from '../../service/Messages';
import { PUB_NUB_CONNECTION_STATE_QUERY } from '../../queries/LocalStateQueries';

const Container = styled.div`
  grid-area: messages;
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  flex-grow: 0;
  margin-top: 0.5rem;
  width: 100%;
  border-top: solid 2px #bbbbbb;
  background-color: whitesmoke;
  padding: 5px;
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

const Beginning = styled(Chip)`
  text-align: center;
  margin-top: 0.5rem;

  border-bottom: 1px solid lightgray;
  padding-bottom: 3px;
  align-self: center;
`;

const Information = styled.div`
  text-align: center;
  margin-top: 20%;
`;

const UnreadInfo = styled.div`
  border-bottom: 1px solid red;
  text-align: center;
  margin: 5px 2rem 0;
`;

const MessageContainer = () => {
  const { data: pnStateData } = useQuery(PUB_NUB_CONNECTION_STATE_QUERY);

  const roomIdContext = useContext(RoomIdContext);
  const roomId = roomIdContext.roomId;
  const variables = {
    roomId,
    after: null,
  };
  const { loading: messagesLoading, error, data, fetchMore } = useQuery(
    MESSAGES_QUERY,
    {
      variables,
      // Don't execute if we don't have a room id or if PubNub isn't connected.
      // We don't want to load the message list until after PN is connected because any message sent between when we
      // get the list and we successfully connect will get missed.
      skip: !roomId || !pnStateData.pnConnected,
    },
  );

  const { loading: roomLoading, data: roomData } = useQuery(ROOM_QUERY, {
    variables: { roomId },
    skip: !roomId,
  });

  const loading = messagesLoading || roomLoading;

  const [isAtBottom, setIsAtBottom] = useState(true);
  // A lock to prevent multiple simultaneous calls to `loadMore`.
  const [isLoadingMore, setIsLoadingMore] = useState(messagesLoading);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (!hasFocus) {
      return;
    }
    // If we have the focus and the data changed, mark all messages read.
    markAllRead(roomId, true);
  }, [data, hasFocus]);

  // This is a hidden div at the bottom of the message list that we use to scroll to. A bit simpler than
  // trying to scroll to the most recent message div or something.
  const eomRef = useRef();
  const scrollToBottom = () => {
    if (!eomRef.current || !isAtBottom) {
      return;
    }
    eomRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data, isAtBottom]);

  useEffect(() => {
    // Scroll to the bottom whenever we switch rooms.
    setIsAtBottom(true);
    scrollToBottom();
  }, [roomId]);

  if (!roomId) {
    return (
      <Information style={{ marginLeft: 10, marginRight: 10 }}>
        Select a conversation to display details
      </Information>
    );
  }

  if (!pnStateData.pnConnected) {
    return (
      <Information>
        <Loading />
        <div>Connecting...</div>
      </Information>
    );
  }

  // This is not state, it is just a function of the results of the query.
  let hasMore = true;

  const loadMore = async () => {
    if (isLoadingMore) {
      // The infinite scroller isn't promise aware, so it tries to load the same page twice.
      // We track the loading state ourselves.
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
          ...results.messages.data,
        ];

        return results;
      },
    });
    setIsLoadingMore(false);
  };

  if (error) {
    console.error(error);
    return <Information>{JSON.stringify(error)}</Information>;
  }

  if (loading || !data) {
    return (
      <Information>
        <Loading />
      </Information>
    );
  }

  let messages = [];
  if (data) {
    messages = [...data.messages.data].reverse();
    hasMore = data.messages.pageInfo.hasNextPage;
  }

  function handleScroll(e) {
    setIsAtBottom(
      e.target.scrollHeight - e.target.scrollTop - 10 <= e.target.clientHeight,
    );
  }

  return (
    <Container>
      <MLWrapper>
        <MLContainer onScroll={handleScroll}>
          <InfiniteScroll
            loader={
              <Information>
                <Loading />
              </Information>
            }
            useWindow={false}
            initialLoad={true}
            isReverse={true}
            loadMore={loadMore}
            hasMore={hasMore}
            // There _may_ be a better way to do this, but this works. I tried using the `element` prop of the
            // InfiniteScroller, but it doesn't work with styled components for some reason.
            style={{
              minHeight: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'column',
            }}
          >
            {!hasMore && <Beginning key={0} label="Beginning of chat" />}
            {messages.map((m) => {
              const isLastRead =
                roomData.room.qtyUnread > 0 &&
                m.messageId === roomData.room.readThrough;
              return (
                <div key={m.messageId}>
                  <MessageItem message={m} room={roomData.room} />
                  {isLastRead && (
                    <UnreadInfo>
                      <Chip
                        label={
                          roomData.room.qtyUnread +
                          ' unread message' +
                          (roomData.room.qtyUnread > 1 ? 's' : '')
                        }
                        style={{
                          marginBottom: '5px',
                        }}
                      />
                    </UnreadInfo>
                  )}
                </div>
              );
            })}
          </InfiniteScroll>
          <div ref={eomRef} />
        </MLContainer>
      </MLWrapper>
      <InputContainer>
        <MessageInput
          updated={scrollToBottom}
          focus={() => setHasFocus(true)}
          blur={() => setHasFocus(false)}
        />
      </InputContainer>
    </Container>
  );
};

export default MessageContainer;
