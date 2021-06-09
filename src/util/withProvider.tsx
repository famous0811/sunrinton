import React from 'react';
import { Provider } from 'mobx-react';

import store from '@src/store';

function withProvider(components: JSX.Element): JSX.Element {
  return <Provider {...store}>{components}</Provider>;
}

export default withProvider;
