import * as React from 'react'
import { NavigatorButton } from '../navigatorbutton'

class Lobby extends React.Component {
    render() {
        return (
            <div >
                <NavigatorButton title="Open Game" to="/game" onClick={() => true} />
            </div>
        );
    }
}

export { Lobby }
