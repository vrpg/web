export class SessionManager {
    private static readonly ACCESS_TOKEN: string = "access_token";
    private static readonly REFRESH_TOKEN: string = "refresh_token";

    private static _instance: SessionManager

    public message:string

    static getInstance = () => {
        if (SessionManager._instance == null) {
            SessionManager._instance = new SessionManager()
        }

        return SessionManager._instance
    }

    isAuthenticated(): boolean {
        return this.getAccessToken() != null && this.getRefreshToken() != null
    }

    getAccessToken(): string {
        return localStorage.getItem(SessionManager.ACCESS_TOKEN)
    }

    getRefreshToken(): string {
        return localStorage.getItem(SessionManager.REFRESH_TOKEN)
    }

    saveTokens(accessToken: string, refreshToken: string) {
        localStorage.setItem(SessionManager.ACCESS_TOKEN, accessToken)
        localStorage.setItem(SessionManager.REFRESH_TOKEN, refreshToken)
    }

    logout() {
        localStorage.removeItem(SessionManager.ACCESS_TOKEN)
        localStorage.removeItem(SessionManager.REFRESH_TOKEN)
    }
}