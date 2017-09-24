import * as React from 'react'
import { NavigatorButton } from '../navigatorbutton'
import { LOGIN_PATH } from '../login'

export interface UnAuthorizedProps {
    errormessage: string
}

export class UnAuthorized extends React.Component<UnAuthorizedProps, undefined> {
    render() {
        return (
            <div>
                <div>{this.props.errormessage}</div>
                <NavigatorButton onClick={() => true} title="Go to login!" to={LOGIN_PATH} />
            </div>
        );
    }
}
