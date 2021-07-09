import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

// import App components
import { App } from './components/app';

loadableReady(() => {
    ReactDOM.hydrate( <BrowserRouter><App globalState={GLOBAL_STATE} /></BrowserRouter>, document.getElementById( 'app' ) )
})