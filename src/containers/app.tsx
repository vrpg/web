import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Login, LOGIN_PATH } from "../react/login";
import { Lobby, LOBBY_PATH } from "../react/lobby";
import { Register, REGISTER_PATH } from "../react/register";
import { GameComponent as Game, GAME_PATH } from "../react/game";
import { Management, MANAGEMENT_PATH } from "../react/management"
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { EDITOR_PATH, Editor } from "../react/editor";

const fullScreen = {
    height: '100%',
    width: '100%',
    display: 'flex'
};

export interface AppProps {
    dispatch: Dispatch<any>;
    isAuthenticated: boolean;
    errorMessage: string;
    quote: string;
    isSecretQuote: boolean;
}

export interface AppState {
    auth: {
        isAuthenticated: boolean,
        errorMessage: string
    }
}

export class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props)

        this.state = {
            auth: {
                errorMessage: '',
                isAuthenticated: false
            }
        }
    }

    render() {
        return <Router >
            <div style={fullScreen}>
                <Route exact path={LOGIN_PATH} component={() => <Login />} />
                <Route path={GAME_PATH} component={() => <Game isAuthenticated={this.props.isAuthenticated}
                    errorMessage={this.props.errorMessage} />} />
                <Route path={LOBBY_PATH} render={({ history }) => <Lobby />} />
                <Route path={REGISTER_PATH} component={Register} />
                <Route path={MANAGEMENT_PATH} component={() => <Management isAuthenticated={this.props.isAuthenticated}
                    errorMessage={this.props.errorMessage} dispatch={this.props.dispatch} />} />
                <Route path={EDITOR_PATH} component={() => <Editor isAuthenticated={this.props.isAuthenticated}
                    errorMessage={this.props.errorMessage} dispatch={this.props.dispatch} />} />
            </div>
        </Router>
    }
}

function mapStateToProps(state: AppState) {
    const { auth } = state;
    const { isAuthenticated, errorMessage } = auth;

    return {
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(App)