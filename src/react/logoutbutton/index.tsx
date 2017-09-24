import * as React from 'react'
import { Dispatch } from 'redux'
import { logoutUser } from './../../actions'
import { LOGIN_PATH } from '../login'
import { NavigatorButton } from '../navigatorbutton'

interface LogOutButtonProps {
    dispatch: Dispatch<any>;
}

export class LogOutButton extends React.Component<LogOutButtonProps, undefined> {
    constructor(props: any) {
        super(props)

        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(event: any): boolean {
        this.props.dispatch(logoutUser())
        return true
    }

    render() {
        return (
            <NavigatorButton title="Log out" to={LOGIN_PATH} onClick={this.handleLogout} />
        );
    }
}