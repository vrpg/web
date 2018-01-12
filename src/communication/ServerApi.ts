import { SessionManager } from "./SessionManager"
import { RequestEnvelope, Request, RequestType, LoginRequestMessage, LoginResponseMessage, RegisterRequestMessage, RegisterResponseMessage, ResponseEnvelope, ResponseType, Response } from "../proto/compiled"
import { Md5 } from 'ts-md5/dist/md5'
import { join } from "path";

export class ServerApi {
    private static _instance: ServerApi
    private readonly sessionManager: SessionManager

    private constructor() {
        this.sessionManager = SessionManager.getInstance()
    }

    static getInstance = () => {
        if (ServerApi._instance == null) {
            ServerApi._instance = new ServerApi()
        }
        return ServerApi._instance
    }

    register = (email: string, password: string): Promise<RegisterResponseMessage> => {
        let requestEnvelope: RequestEnvelope = new RequestEnvelope({
            request: new Request({
                request_type: RequestType.REGISTER_REQUEST,
                request_message: RegisterRequestMessage.encode(
                    new RegisterRequestMessage({
                        email: email,
                        pass_token: <string>Md5.hashStr(password)
                    })
                ).finish()
            })
        })

        let config: RequestInit = {
            method: 'POST',
            mode: 'cors',
            body: RequestEnvelope.encode(requestEnvelope).finish()
        }

        return fetch(API_URL + '/register', config)
            .catch(err => { throw new Error(err) })
            .then(response => response.json()
                .then(json => ({ json, response }))
            ).then(({ json, response }) => {
                console.log(json)
                if (!response.ok) {
                    return new RegisterResponseMessage({
                        message: json.message
                    })
                }
                return new RegisterResponseMessage()
            })
    }

    login(email: string, password: string): Promise<LoginResponseMessage> {
        let requestEnvelope: RequestEnvelope = new RequestEnvelope({
            request: new Request({
                request_type: RequestType.LOGIN_REQUEST,
                request_message: LoginRequestMessage.encode(new LoginRequestMessage({
                    email: email,
                    pass_token: <string>Md5.hashStr(password)
                })).finish()
            })
        })

        let config: RequestInit = {
            method: 'POST',
            mode: 'cors',
            body: RequestEnvelope.encode(requestEnvelope).finish(),
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        return fetch(API_URL + '/login', config)
            .then(response => response.json()
                .then(body => ({ body, response }))
            ).then(({ body, response }) => {
                console.log(response)
                console.log(body)

                if (!response.ok) {
                    console.log(3)
                    return new LoginResponseMessage({
                        message: "not cool"
                    })
                }

                let responseEnvelope = ResponseEnvelope.fromObject(body)
                console.log(JSON.stringify(responseEnvelope.toJSON()))

                if (responseEnvelope.response.response_type != ResponseType.LOGIN_RESPONSE) {
                    console.log(4)
                    this.sessionManager.message = "Not cool"
                    return new LoginResponseMessage({
                        message: "Not cool"
                    })
                }

                let loginRepsonse = LoginResponseMessage.decode(responseEnvelope.response.response_message)

                this.sessionManager.saveTokens(loginRepsonse.access_token, loginRepsonse.refresh_token)

                console.log("wut")
                return loginRepsonse
            })
            .catch(err => { throw new Error(err) })
    }
}
