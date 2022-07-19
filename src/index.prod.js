import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/app';

import { hydrateRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = hydrateRoot(container, <BrowserRouter><App globalState={GLOBAL_STATE} /></BrowserRouter>);