const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(error.message || response.statusText);
  }
  return response.json();
};

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getHeaders(),
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    return handleResponse(response);
  },
};

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (data) => api.post('/auth/signup', data),
  logout: () => api.post('/auth/logout', {}),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  getCurrentUser: () => api.get('/auth/me'),
  refreshToken: () => api.post('/auth/refresh-token', {}),
};

export const leadsAPI = {
  getLeads: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/leads${queryString ? '?' + queryString : ''}`);
  },
  getLead: (id) => api.get(`/leads/${id}`),
  createLead: (data) => api.post('/leads', data),
  updateLead: (id, data) => api.put(`/leads/${id}`, data),
  deleteLead: (id) => api.delete(`/leads/${id}`),
  deleteMultipleLeads: (ids) => api.post('/leads/bulk/delete', { ids }),
  getLeadsByStatus: (status) => api.get(`/leads?status=${status}`),
  searchLeads: (query) => api.get(`/leads?search=${query}`),
  getLeadMetrics: () => api.get('/leads/metrics/summary'),
};

export const dashboardAPI = {
  getDashboardStats: () => api.get('/dashboard/stats'),
  getActivities: (limit = 10) => api.get(`/dashboard/activities?limit=${limit}`),
  getRecentDeals: (limit = 10) => api.get(`/dashboard/deals?limit=${limit}`),
  getMarketingPerformance: (period = 'month') => api.get(`/dashboard/marketing?period=${period}`),
  getAISuggestions: () => api.get('/dashboard/ai-suggestions'),
};

export const tasksAPI = {
  getTasks: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/tasks${queryString ? '?' + queryString : ''}`);
  },
  getTask: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  completeTask: (id) => api.put(`/tasks/${id}/complete`, {}),
  getTasksByLead: (leadId) => api.get(`/leads/${leadId}/tasks`),
};

export const dealAPI = {
  getDeals: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/deals${queryString ? '?' + queryString : ''}`);
  },
  getDeal: (id) => api.get(`/deals/${id}`),
  createDeal: (data) => api.post('/deals', data),
  updateDeal: (id, data) => api.put(`/deals/${id}`, data),
  deleteDeal: (id) => api.delete(`/deals/${id}`),
  getDealsByLead: (leadId) => api.get(`/leads/${leadId}/deals`),
  createDealForLead: (leadId, data) => api.post(`/leads/${leadId}/deals`, data),
};

export const documentsAPI = {
  getDocuments: (leadId) => api.get(`/leads/${leadId}/documents`),
  uploadDocument: (leadId, formData) => {
    const token = localStorage.getItem('auth_token');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    return fetch(`${API_BASE_URL}/leads/${leadId}/documents`, {
      method: 'POST',
      headers,
      body: formData,
    }).then(handleResponse);
  },
  deleteDocument: (leadId, documentId) => api.delete(`/leads/${leadId}/documents/${documentId}`),
  downloadDocument: (leadId, documentId) => api.get(`/leads/${leadId}/documents/${documentId}/download`),
};

export const activitiesAPI = {
  getActivities: (leadId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/leads/${leadId}/activities${queryString ? '?' + queryString : ''}`);
  },
  createActivity: (leadId, data) => api.post(`/leads/${leadId}/activities`, data),
  deleteActivity: (leadId, activityId) => api.delete(`/leads/${leadId}/activities/${activityId}`),
};

export const teamAPI = {
  getTeam: () => api.get('/team/members'),
  getTeamMember: (id) => api.get(`/team/members/${id}`),
  inviteTeamMember: (data) => api.post('/team/invites', data),
  getTeamInvites: () => api.get('/team/invites'),
  acceptInvite: (inviteId) => api.post(`/team/invites/${inviteId}/accept`, {}),
  declineInvite: (inviteId) => api.post(`/team/invites/${inviteId}/decline`, {}),
  removeTeamMember: (id) => api.delete(`/team/members/${id}`),
};

export const settingsAPI = {
  getProfile: () => api.get('/settings/profile'),
  updateProfile: (data) => api.put('/settings/profile', data),
  changePassword: (oldPassword, newPassword) => api.post('/settings/change-password', { oldPassword, newPassword }),
  updateNotificationSettings: (data) => api.put('/settings/notifications', data),
  getNotificationSettings: () => api.get('/settings/notifications'),
};
