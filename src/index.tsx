import * as React from 'react'
import * as Raven from 'raven-js';
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Login } from "./react/login";
import { Lobby,LOBBY_PATH } from "./react/lobby";
import { Register,REGISTER_PATH } from "./react/register";
import { GameComponent as Game, GAME_PATH } from "./react/game";
import { Management, MANAGEMENT_PATH } from "./react/management"

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
            <Route path={GAME_PATH} component={Game} />
            <Route path={LOBBY_PATH} component={Lobby} />
            <Route path={REGISTER_PATH} component={Register} />
            <Route path={MANAGEMENT_PATH} component={Management} />
        </div>
    </Router>
), document.getElementById("root"))
