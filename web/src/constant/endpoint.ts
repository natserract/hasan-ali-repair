const rwApiUrl = global.RWJS_API_URL
const _rwGraphqlUrl = global.RWJS_API_GRAPHQL_URL

const appHost = process.env.APP_HOST
const appWebPort = process.env.APP_WEB_PORT
const appApiPort = process.env.APP_API_PORT

export const API_URL = `${appHost}:${appWebPort}${rwApiUrl}`
export const GRAPHQL_URL = `${appHost}:${appApiPort}/graphql`
