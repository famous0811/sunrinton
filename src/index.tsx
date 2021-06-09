import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';

import App from './App';
import * as serviceWorker from '@src/serviceWorker';

import withProvider from '@util/withProvider';

export const RootComponent = withProvider(<App />);

function Root(): void {
  dotenv.config();

  ReactDOM.render(RootComponent, document.getElementById('root'));

  serviceWorker.unregister();
}

export default Root();
