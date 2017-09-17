import Raven from 'raven-js';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Login } from "./react/login";
import { GameComponent as Game } from "./react/game";

if (SENTRY_DSN) {
    Raven.config(SENTRY_DSN).install();
}

render((
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/game">Game</Link></li>
            </ul>

            <Route exact path="/" component={Login} />
            <Route path="/game" component={Game} />
        </div>
    </Router>
), document.getElementById('app'))
