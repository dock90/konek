import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { auth } from './firebase';

Bugsnag.start({
  apiKey: '6caa684f40a43db2f1922b24877aa55f',
  plugins: [new BugsnagPluginReact()],
});

export const BugsnagErrorBoundary = Bugsnag.getPlugin(
  'react',
)?.createErrorBoundary(React);

auth.onAuthStateChanged(async (user) => {
  if (user) {
    Bugsnag.setUser(
      user.uid,
      user.email || undefined,
      user.displayName || undefined,
    );
  } else {
    Bugsnag.setUser(undefined, undefined, undefined);
  }
});

export default Bugsnag;
