import * as React from 'react'
import { NavigatorButton } from '../navigatorbutton'
import { MANAGEMENT_PATH } from '../management'
import { GAME_PATH } from '../game'
import { UnAuthorized } from '../unauthorized'
import { Dispatch } from 'redux'
import { LogOutButton } from '../logoutbutton'
import { SessionManager } from '../../communication/SessionManager';

export const LOBBY_PATH: string = '/lobby'

export class Lobby extends React.Component<undefined, undefined> {
    render() {
        if (SessionManager.getInstance().isAuthenticated()) {
            return (
                <div >
                    <NavigatorButton title="Open Game" to={GAME_PATH} onClick={() => Promise.resolve(true)} />
                    <NavigatorButton title="Go to management" to={MANAGEMENT_PATH} onClick={() => Promise.resolve(true)} />
                    <LogOutButton />
                </div>
            );
        } else {
            return (
                <UnAuthorized errormessage={SessionManager.getInstance().message} />
            );
        }
    }
}
