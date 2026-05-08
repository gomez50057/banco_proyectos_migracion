import httpClient from './httpClient';
import { API_ENDPOINTS } from './endpoints';

export const getCurrentUser = () => httpClient.get(API_ENDPOINTS.auth.currentUser);

export const getCsrfToken = () => httpClient.get(API_ENDPOINTS.auth.csrfToken);

export const login = (credentials) => httpClient.post(API_ENDPOINTS.auth.login, credentials);

export const logout = () => httpClient.post(API_ENDPOINTS.auth.logout);
