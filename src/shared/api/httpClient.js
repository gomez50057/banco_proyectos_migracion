import axios from 'axios';
import Cookies from 'js-cookie';

const getCsrfToken = () => {
  if (typeof document === 'undefined') return undefined;
  return Cookies.get('csrftoken');
};

const isFormData = (value) => (
  typeof FormData !== 'undefined' && value instanceof FormData
);

const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const token = getCsrfToken();
  config.headers = config.headers ?? {};

  if (token) {
    config.headers['X-CSRFToken'] = token;
  }

  if (isFormData(config.data)) {
    delete config.headers['Content-Type'];
  } else if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

export default httpClient;
