import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// import App components
import { App } from './components/app';

const DATA = {
    text: 'Hello World!'
}

// compile App component in `#app` HTML element
ReactDOM.hydrate( <BrowserRouter><App { ...DATA } /></BrowserRouter>, document.getElementById( 'app' ) );
