import * as React from 'react'
import { Dispatch } from 'redux'
import { logoutUser } from './../../actions'
import { LOGIN_PATH } from '../login'
import { NavigatorButton } from '../navigatorbutton'

export class LogOutButton extends React.Component<undefined, undefined> {
    constructor(props: any) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(): Promise<boolean> {
        return Promise.resolve(true)
    }

    render() {
        return (
            <NavigatorButton title="Log out" to={LOGIN_PATH} onClick={this.handleLogout} />
        );
    }
}