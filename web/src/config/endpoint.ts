
const rwApiUrl = global.RWJS_API_URL;
const appHost = process.env.APP_HOST;
const appPort = process.env.APP_PORT;

export const API_URL = `${appHost}:${appPort}${rwApiUrl}`
export const GRAPHQL_URL = `${appHost}:${appPort}/graphql`
