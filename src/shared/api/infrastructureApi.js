import httpClient from './httpClient';
import { API_ENDPOINTS } from './endpoints';

export const createInfrastructureProject = (project, config) => (
  httpClient.post(API_ENDPOINTS.infrastructure.create, project, config)
);

export const uploadInfrastructureProjectDocument = (projectId, formData, config) => (
  httpClient.post(API_ENDPOINTS.infrastructure.uploadDocument(projectId), formData, config)
);
