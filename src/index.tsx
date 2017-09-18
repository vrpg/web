import * as React from 'react'
import * as Raven from 'raven-js';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Login } from "./react/login";
import { Lobby } from "./react/lobby";
import { Register } from "./react/register";
import { GameComponent as Game } from "./react/game";

if (SENTRY_DSN) {
    Raven.config(SENTRY_DSN).install();
}

const fullScreen = {
    height: '100%',
    width: '100%',
    display: 'flex'
};

render((
    <Router>
        <div style={fullScreen}>
            <Route exact path="/" component={Login} />
            <Route path="/game" component={Game} />
            <Route path="/lobby" component={Lobby} />
            <Route path="/register" component={Register} />
        </div>
    </Router>
), document.getElementById('app'))
