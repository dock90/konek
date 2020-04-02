import * as fb from "firebase/app";
import "firebase/auth";

// initialize config
const config = {
  apiKey: "AIzaSyC8mLBfTQxv2gfJ8UrXtl6_qsL9awCbtxE",
  authDomain: "equiptercrm.firebaseapp.com",
  databaseURL: "https://equiptercrm.firebaseio.com",
  projectId: "equiptercrm",
  storageBucket: "equiptercrm.appspot.com",
  messagingSenderId: "696329386413",
  appId: "1:696329386413:web:58d6f07a93260918024924",
  measurementId: "G-D4702DD6V3"
};

// initialize firebase
if (!fb.apps.length) {
  fb.initializeApp(config);
}

export const auth = fb.auth();
export const firebase = fb;
