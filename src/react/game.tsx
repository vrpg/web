import * as React from 'react';
import { findDOMNode } from "react-dom";
import { Game } from "../game/Game";

class GameComponent extends React.Component {
    componentDidMount() {
        let game = new Game('renderCanvas');
        game.createScene();
        game.animate();
    }
    render() {
        return (
            <div id="game">
                <canvas id="renderCanvas" />
            </div>
        );
    }
}

export { GameComponent }