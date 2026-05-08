import httpClient from './httpClient';
import { API_ENDPOINTS } from './endpoints';

export const getInvestmentProjects = () => httpClient.get(API_ENDPOINTS.investment.list);

export const getInvestmentProject = (projectId) => httpClient.get(API_ENDPOINTS.investment.byId(projectId));

export const createInvestmentProject = (formData, config) => (
  httpClient.post(API_ENDPOINTS.investment.list, formData, config)
);

export const updateInvestmentProject = (projectId, project, config) => (
  httpClient.put(API_ENDPOINTS.investment.byId(projectId), project, config)
);
