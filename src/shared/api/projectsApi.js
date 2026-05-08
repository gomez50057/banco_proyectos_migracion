import httpClient from './httpClient';
import { API_ENDPOINTS } from './endpoints';

export const getProjects = () => httpClient.get(API_ENDPOINTS.projects.list);

export const getProject = (projectId) => httpClient.get(API_ENDPOINTS.projects.byId(projectId));

export const createProject = (project, config) => httpClient.post(API_ENDPOINTS.projects.create, project, config);

export const saveProject = (project, config) => httpClient.post(API_ENDPOINTS.projects.save, project, config);

export const updateProject = (projectId, project, config) => (
  httpClient.put(API_ENDPOINTS.projects.byId(projectId), project, config)
);

export const updateProjectFormData = (projectId, formData, config) => (
  httpClient.put(API_ENDPOINTS.projects.update(projectId), formData, config)
);

export const uploadProjectDocument = (projectId, formData, config) => (
  httpClient.post(API_ENDPOINTS.projects.uploadDocument(projectId), formData, config)
);

export const getUserProjectsTable = () => httpClient.get(API_ENDPOINTS.projects.userTable);

export const getPublicProjectsTable = () => httpClient.get(API_ENDPOINTS.projects.publicTable);

export const getAdminProjectsTable = () => httpClient.get(API_ENDPOINTS.projects.adminTable);
