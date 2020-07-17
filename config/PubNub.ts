import PubNub, { ListenerParameters, StatusEvent, MessageEvent } from 'pubnub';
import { client } from './apollo';
import { ME_QUERY } from '../queries/MeQueries';
import { addMessage } from '../service/Messages';
import { auth } from './firebase';
import { PUB_NUB_CONNECTION_STATE_QUERY } from '../queries/LocalStateQueries';
import { MeQuery } from '../queries/types/MeQuery';

/*
 * When in an HMR environment, PN can end up with multiple simultaneous connections, which can cause
 * weird issues with the qty unread messages counts. Do a full page refresh to resolve.
 */

const LOCAL_STORAGE_UUID_KEY = 'pnuuid';

auth.onAuthStateChanged(async (user) => {
  if (user) {
    await initPubNub();
  } else {
    await closePubNub();
  }
});

function getUuid() {
  let uuid = window.localStorage.getItem(LOCAL_STORAGE_UUID_KEY);

  if (!uuid) {
    uuid = '';
    while (uuid.length < 15) {
      uuid += Math.random().toString(36).substring(16);
    }

    uuid = uuid.substring(0, 15);

    window.localStorage.setItem(LOCAL_STORAGE_UUID_KEY, uuid);
  }

  return uuid;
}
function setConnected(connected: boolean) {
  client.writeQuery({
    query: PUB_NUB_CONNECTION_STATE_QUERY,
    data: { pnConnected: connected },
  });
}

const listeners: ListenerParameters = {
  message: async (message: MessageEvent) => {
    const data = message.message;
    switch (data.type) {
      case 'message':
        await addMessage(
          data.messageId,
          data.roomId,
          data.body,
          data.authorId,
          data.asset,
        );
        break;
      case 'chChange':
        console.log(data.type);
        if (pn) {
          // TODO: refresh room list and contacts.
          // await refreshSubscriptions(pn, true);
        }
        break;
      default:
        // Unknown message type.
        console.log(`Unknown message type: ${JSON.stringify(message)}`);
        break;
    }
  },
  status: async function (status: StatusEvent) {
    switch (status.category) {
      case PubNub.CATEGORIES.PNNetworkUpCategory:
      case PubNub.CATEGORIES.PNConnectedCategory:
      case PubNub.CATEGORIES.PNReconnectedCategory:
        setConnected(true);
        break;
      case PubNub.CATEGORIES.PNNetworkDownCategory:
      case PubNub.CATEGORIES.PNNetworkIssuesCategory:
      case PubNub.CATEGORIES.PNAccessDeniedCategory:
        setConnected(false);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        await closePubNub();
        // Force a re-load of "me" so that it gets a new key, etc.
        await client.query({ query: ME_QUERY, fetchPolicy: 'network-only' });
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        await initPubNub();
        break;
      default:
        console.log(status);
    }
  },
};

let pn: PubNub | undefined;

/**
 * Must be called AFTER firebase has been authorized.
 * @return {Promise<void>}
 */
export async function initPubNub() {
  if (pn) {
    return;
  }

  const { data } = await client.query<MeQuery>({
    query: ME_QUERY,
  });

  if (!data) {
    return;
  }

  const pubNubInfo = data.me.pubNubInfo;

  pn = new PubNub({
    subscribeKey: pubNubInfo.subscribeKey,
    authKey: pubNubInfo.authKey,
    ssl: true,
    uuid: getUuid(),
  });

  pn.addListener(listeners);

  pn.subscribe({
    channelGroups: [pubNubInfo.channelGroup],
  });
}

/**
 *
 * @return {Promise<void>}
 */
export async function closePubNub() {
  if (pn) {
    pn.removeListener(listeners);
    pn.unsubscribeAll();
    pn = undefined;
  }
}
