import * as React from 'react'
import { Upload } from '../upload'
import { UnAuthorized } from '../unauthorized'
import { LogOutButton } from '../logoutbutton'
import { Dispatch } from 'redux'

export const MANAGEMENT_PATH = "/management"

export interface ManagementProps {
    isAuthenticated: boolean;
    errorMessage: string;
    dispatch: Dispatch<any>;
}

export class Management extends React.Component<ManagementProps, undefined> {

    render() {
        if (this.props.isAuthenticated) {
            return <div>
                <Upload endPoint="/management/fileUploadObj" title="Upload obj" />
                <Upload endPoint="/management/fileUploadMtl" title="Upload mtl" />
                <LogOutButton dispatch={this.props.dispatch} />
            </div>
        } else {
            return <UnAuthorized errormessage={this.props.errorMessage} />
        }
    }
}
