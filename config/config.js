import ip from 'ip'
import debug from 'debug'
import path from 'path'

const localip = ip.address()

// =====================
// Default Configuration
// =====================
const config = {
    env: process.env.NODE_ENV || 'development',
    path_base: path.resolve(__dirname, '..'),
    dir_src: 'src',
    dir_dist: 'dist'
}

// -----------
// Environment
// -----------
config.globals = {
    'process.env': {
        'NODE_ENV': JSON.stringify(config.env)
    },
    'NODE_ENV': config.env,
}

// ---------
// Utilities
// ---------
const resolve = path.resolve
const base = (...args) =>
    Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
    base: base,
    src: base.bind(null, config.dir_src),
    dist: base.bind(null, config.dir_dist)
}

// -------------------------
// Environment Configuration
// -------------------------
debug(`Looking for environment overrides for NODE_ENV "${config.env}".`)
const buildTargetConfigs = require('./build.js').default
const buildOverrides = buildTargetConfigs[config.env]

if (buildOverrides) {
    debug('Found overrides, applying to default configuration.')
    Object.assign(config, buildOverrides(config))
} else {
    debug('No environment overrides found, defaults will be used.')
}

export default config
