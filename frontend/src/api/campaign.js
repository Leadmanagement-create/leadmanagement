export default {
  GET_ALL_CAMPAIGN: () => `/campaignEvent/getAllCampaignEvent`,
  GET_CAMPAIGN_BY_ID: (id) => `/campaignEvent/getCampaignEventById/${id}`,
  DELETE_CAMPAIGN: (id) => `/campaignEvent/deleteCapmaignEventById/${id}`,
  UPDATE_CAMPAIGN: (id) => `/campaignEvent/updateCampaignEventById/${id}`,
  UPDATE_CAMPAIGN_Status: (id) => `/campaignEvent/campaigns/status/${id}`,
  CREATE_CAMPAIGN: () => '/campaignEvent/create',
}
