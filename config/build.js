const developmentOverrides = (config) => ({
    globals: {
        ...config.globals,
        API_URL: JSON.stringify("http://localhost:8080"),
        WEBSOCKET_URL: JSON.stringify("ws://localhost:8080"),
        SENTRY_DSN: null
    }
})

const productionOverrides = (config) => ({
    globals: {
        ...config.globals,
        API_URL: JSON.stringify("https://vr-rpg-server.herokuapp.com"),
        WEBSOCKET_URL: JSON.stringify("wss://vr-rpg-server.herokuapp.com"),
        SENTRY_DSN: JSON.stringify("https://46582dadec6449f0b0ff2e54dcd8879a@sentry.io/211461")
    }
})

export default {
    development: developmentOverrides,
    production: productionOverrides
}