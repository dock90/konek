import PubNub from "pubnub";
import { client } from "./apollo";
import { ME_QUERY } from "../queries/MeQueries";
import { addMessage } from "../service/Messages";
import { auth } from "./firebase";

const LOCAL_STORAGE_UUID_KEI = "pnuuid";
let pn;

auth.onAuthStateChanged(user => {
  if (user) {
    initPubNub();
  } else {
    closePubNub();
  }
});

function getUuid() {
  let uuid = window.localStorage.getItem(LOCAL_STORAGE_UUID_KEI);

  if (!uuid) {
    uuid = "";
    while (uuid.length < 15) {
      uuid += Math.random()
        .toString(36)
        .substring(16);
    }

    uuid = uuid.substring(0, 15);

    window.localStorage.setItem(LOCAL_STORAGE_UUID_KEI, uuid);
  }

  return uuid;
}

const listeners = {
  message: async msg => {
    if (msg.message.type !== "message") {
      console.log(msg);
      // We don't (yet) know how to do anything other than handle messages.
      return;
    }

    await addMessage(
      msg.message.messageId,
      msg.message.roomId,
      msg.message.body,
      msg.message.authorId
    );
  }
};

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
    pn = undefined;
  }
}
