import * as React from 'react';
import { findDOMNode } from "react-dom";
import { Game } from "../game/Game";
import { UnAuthorized } from './unauthorized'

export const GAME_PATH: string = '/game'

export interface GameComponentProps {
    isAuthenticated: boolean;
    errorMessage: string;
}

export class GameComponent extends React.Component<GameComponentProps, undefined> {
    componentDidMount() {
        if (document.getElementById('renderCanvas')) {
            let game = new Game('renderCanvas');
            game.createScene();
            game.animate();
        }
    }
    render() {
        if (this.props.isAuthenticated) {
            return (
                <div id="game">
                    <canvas id="renderCanvas" />
                </div>
            );
        } else {
            return <UnAuthorized errormessage={this.props.errorMessage} />
        }
    }
}
