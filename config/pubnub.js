import PubNub from "pubnub";
import { client } from "./apollo";
import { ME_QUERY } from "../queries/MeQueries";
import { addMessage } from "../service/Messages";
import { auth } from "./firebase";

/*
 * When in an HMR environment, PN can end up with multiple simultaneous connections, which can cause
 * weird issues with the qty unread messages counts. Do a full page refresh to resolve.
 */

const LOCAL_STORAGE_UUID_KEY = "pnuuid";

auth.onAuthStateChanged(async user => {
  if (user) {
    await initPubNub();
  } else {
    await closePubNub();
  }
});

function getUuid() {
  let uuid = window.localStorage.getItem(LOCAL_STORAGE_UUID_KEY);

  if (!uuid) {
    uuid = "";
    while (uuid.length < 15) {
      uuid += Math.random()
        .toString(36)
        .substring(16);
    }

    uuid = uuid.substring(0, 15);

    window.localStorage.setItem(LOCAL_STORAGE_UUID_KEY, uuid);
  }

  return uuid;
}
function setConnected(connected) {
  client.writeData({
    data: { pnConnected: connected }
  });
}

const listeners = {
  message: async message => {
    const data = message.message;
    if (data.type !== "message") {
      console.log(message);
      // We don't (yet) know how to do anything other than handle messages.
      return;
    }

    await addMessage(data.messageId, data.roomId, data.body, data.authorId);
  },
  status: async function(s) {
    console.log(s);
    switch (s.category) {
      case "PNNetworkUpCategory":
      case "PNConnectedCategory":
      case "PNReconnectedCategory":
        setConnected(true);
        break;
      case "PNNetworkDownCategory":
      case "PNNetworkIssuesCategory":
      case "PNAccessDeniedCategory":
        setConnected(false);
        await closePubNub();
        // Force a re-load of "me" so that it gets a new key, etc.
        await client.query({ query: ME_QUERY, fetchPolicy: "network-only" });
        await initPubNub();
        break;
      default:
        console.log(s);
    }
  }
};

let pn;

/**
 * Must be called AFTER firebase has been authorized.
 * @return {Promise<void>}
 */
export async function initPubNub() {
  if (pn) {
    return;
  }

  const {
    data: {
      me: { pubNubInfo }
    }
  } = await client.query({
    query: ME_QUERY
  });

  pn = new PubNub({
    subscribeKey: pubNubInfo.subscribeKey,
    authKey: pubNubInfo.authKey,
    ssl: true,
    uuid: getUuid()
  });

  pn.addListener(listeners);

  pn.subscribe({
    channelGroups: [pubNubInfo.channelGroup]
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
