import * as React from 'react'
import * as Raven from 'raven-js';
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rpgApp from './reducers'
import api from './middleware/api'
import App from './containers/app'

if (SENTRY_DSN) {
    Raven.config(SENTRY_DSN).install();
}

let createStoreWithMiddleware = applyMiddleware(thunk, api)(createStore)

let store = createStoreWithMiddleware(rpgApp)

render((
    <Provider store={store}>
        <App />
    </Provider >
), document.getElementById("root"))
