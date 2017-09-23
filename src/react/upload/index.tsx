import * as React from 'react'
import { UUID } from '../../util/uuid'

export interface UploadProps { title: string, endPoint: string }

class Upload extends React.Component<UploadProps, undefined> {

    private FORM_ID: string

    constructor(props: any) {
        super(props);

        this.handleUpload = this.handleUpload.bind(this);
        this.FORM_ID = 'obj-upload-' + UUID.generateUUID();
    }

    private handleUpload() {
        console.log("upload")

        let form: any = document.getElementById(this.FORM_ID);
        let formData = new FormData(form);

        fetch(API_URL + this.props.endPoint, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).then(repsonse => {
            console.log(repsonse);
        }).then(success => {
            console.log(success);
        }).catch(error => {
            console.warn(error);
        });
    }

    render() {
        return <div>
            <form id={this.FORM_ID} encType='multipart/form-data' method="post">
                <div>{this.props.title}</div>
                <input type="file" name='myFile' />
            </form>
            <input type="submit" name="submitButton" value="Upload" onClick={this.handleUpload} />
        </div>
    }
}

export { Upload }
