export const API_ENDPOINTS = Object.freeze({
  auth: {
    currentUser: '/api/current_user/',
    csrfToken: '/api/csrf-token/',
    login: '/inicio-sesion/',
    logout: '/api/logout/',
  },
  projects: {
    list: '/proyecto/',
    byId: (projectId) => `/proyecto/${projectId}/`,
    update: (projectId) => `/update-project/${projectId}/`,
    create: '/proyecto/',
    save: 'guardar-proyecto/',
    uploadDocument: (projectId) => `/projects/${projectId}/upload-document/`,
    userTable: '/ver-proyectos-usuario/',
    publicTable: '/ver-proyectos-tabla/',
    adminTable: '/ver-proyectos-tabla-admin/',
  },
  infrastructure: {
    create: 'api/b/create-project/',
    uploadDocument: (projectId) => `/api/b/projects/${projectId}/upload-document/`,
  },
  investment: {
    list: 'cedulas/',
    byId: (projectId) => `/cedulas/${projectId}/`,
  },
  dashboard: {
    projectsByResponsibleUnit: '/api/proyectos_por_unidad_responsable/',
    projectsByUser: '/api/proyectos_por_usuario/',
    campaignProposal: '/api/propuesta_campana/',
    proposalDetail: '/api/cual_propuesta/',
    projectCoverage: '/api/cobertura_proyecto/',
  },
});
