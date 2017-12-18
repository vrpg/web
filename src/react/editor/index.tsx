import * as React from 'react'
import { NavigatorButton } from '../navigatorbutton'
import { MANAGEMENT_PATH } from '../management'
import { UnAuthorized } from '../unauthorized'
import { Dispatch } from 'redux'
import { LogOutButton } from '../logoutbutton'
import { GameEditor } from '../../game/editor/GameEditor';

export const EDITOR_PATH = '/editor'

export interface EditorProps {
    isAuthenticated: boolean
    errorMessage: string
    dispatch: Dispatch<any>
}

export class Editor extends React.Component<EditorProps, undefined> {
    componentDidMount() {
        let canvas = document.getElementById('renderCanvas')
        if (canvas && canvas instanceof HTMLCanvasElement) {
            let gameEditor = new GameEditor(canvas as HTMLCanvasElement)
            gameEditor.createScene()
            gameEditor.animate()
        }
    }

    render() {
        return (
            <div id="game">
                <canvas id="renderCanvas" />
            </div>
        )
    }
}