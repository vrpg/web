import * as React from 'react'
import { NavigatorButton } from '../navigatorbutton'
import { GAME_PATH } from '../game'

export const LOBBY_PATH: string = '/lobby'

class Lobby extends React.Component {
    render() {
        return (
            <div >
                <NavigatorButton title="Open Game" to={GAME_PATH} onClick={() => true} />
            </div>
        );
    }
}

export { Lobby }
