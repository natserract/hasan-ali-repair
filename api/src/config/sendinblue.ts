import SibApiV3Sdk from 'sib-api-v3-sdk'

const defaultClient = SibApiV3Sdk.ApiClient.instance

// # Instantiate the client
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = process.env.SENDINBLUE_APIKEY

const apiInstance = new SibApiV3Sdk.EmailCampaignsApi()
const emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign()

export { apiInstance, emailCampaigns }
