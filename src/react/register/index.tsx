import * as React from 'react'
import { NavigatorButton } from '../navigatorbutton'

const loginContainerStyle: React.CSSProperties = {
    margin: 'auto',
    border: '1px solid black',
    padding: '10px'
};

const formRowStyle: React.CSSProperties = {
    width: '250px',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '10px'
};

const buttonAreaStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-evenly'
};

export interface RegisterState { username: string; password: string }

export const REGISTER_PATH:string = '/register'

class Register extends React.Component<undefined, RegisterState> {
    constructor(props: any) {
        super(props);

        this.state = { username: '', password: '' }

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleUserChange(event: any) {
        this.setState({ username: event.target.value })
    }

    handlePasswordChange(event: any) {
        this.setState({ password: event.target.value })
    }

    handleLogin(event?: any): boolean {
        return true;
    }

    handleRegister(event?: any): boolean {
        //TODO register logic
        console.log("Register user: " + this.state.username + ", password: " + this.state.password);
        return true;
    }
    render() {
        console.log("render")
        return (
            <div className="login-container" style={loginContainerStyle}>
                <div className="form-area">
                    <div style={formRowStyle}>
                        <label>Username</label>
                        <input type="text" name="username" onChange={this.handleUserChange} />
                    </div>
                    <div style={formRowStyle}>
                        <label>Password</label>
                        <input type="password" name="password" onChange={this.handlePasswordChange} />
                    </div>
                </div>
                <div style={buttonAreaStyle}>
                    <NavigatorButton title="Register" to="lobby" onClick={this.handleRegister} />
                    <NavigatorButton title="Back to Login" to="/" onClick={this.handleLogin} />
                </div>
            </div>
        );
    }
}

export { Register }
