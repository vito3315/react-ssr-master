import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import App components
import { App } from './components/app';

// compile App component in `#app` HTML element
ReactDOM.hydrate( <BrowserRouter><App globalState={GLOBAL_STATE} device={globalDevice} /></BrowserRouter>, document.getElementById( 'app' ) );