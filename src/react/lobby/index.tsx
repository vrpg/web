import * as React from 'react'
import { NavigatorButton } from '../navigatorbutton'
import { MANAGEMENT_PATH } from '../management'
import { GAME_PATH } from '../game'
import { UnAuthorized } from '../unauthorized'
import { Dispatch } from 'redux'
import { LogOutButton } from '../logoutbutton'

export const LOBBY_PATH: string = '/lobby'

export interface LobbyProps {
    isAuthenticated: boolean;
    errorMessage: string;
    dispatch: Dispatch<any>;
}

export class Lobby extends React.Component<LobbyProps, undefined> {
    render() {
        if (this.props.isAuthenticated) {
            return (
                <div >
                    <NavigatorButton title="Open Game" to={GAME_PATH} onClick={() => true} />
                    <NavigatorButton title="Go to management" to={MANAGEMENT_PATH} onClick={() => true} />
                    <LogOutButton dispatch={this.props.dispatch} />
                </div>
            );
        } else {
            return (
                <UnAuthorized errormessage={this.props.errorMessage} />
            );
        }
    }
}
