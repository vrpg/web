import * as React from 'react'
import { Upload } from '../upload'

export const MANAGEMENT_PATH = "/management"

class Management extends React.Component {

    render() {
        return <div>
            <Upload endPoint="/management/fileUploadObj" title="Upload obj" />
            <Upload endPoint="/management/fileUploadMtl" title="Upload mtl" />
        </div>
    }
}

export { Management }
