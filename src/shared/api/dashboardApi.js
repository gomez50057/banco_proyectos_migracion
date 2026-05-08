import httpClient from './httpClient';
import { API_ENDPOINTS } from './endpoints';

export const getDashboardInvestmentData = async () => {
  const [
    projectsByResponsibleUnit,
    projectsByUser,
    campaignProposal,
    proposalDetail,
    projectCoverage,
  ] = await Promise.all([
    httpClient.get(API_ENDPOINTS.dashboard.projectsByResponsibleUnit),
    httpClient.get(API_ENDPOINTS.dashboard.projectsByUser),
    httpClient.get(API_ENDPOINTS.dashboard.campaignProposal),
    httpClient.get(API_ENDPOINTS.dashboard.proposalDetail),
    httpClient.get(API_ENDPOINTS.dashboard.projectCoverage),
  ]);

  return {
    projectsByResponsibleUnit: projectsByResponsibleUnit.data,
    projectsByUser: projectsByUser.data,
    campaignProposal: campaignProposal.data,
    proposalDetail: proposalDetail.data,
    projectCoverage: projectCoverage.data,
  };
};
