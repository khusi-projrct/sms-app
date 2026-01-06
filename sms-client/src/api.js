import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const register = (data) => axios.post(`${API_BASE}/auth/register`, data);
export const login = (data) => axios.post(`${API_BASE}/auth/login`, data);
export const getProfile = (token) => axios.get(`${API_BASE}/auth/profile`,
    { headers: { Authorization: `Bearer ${token}` } }
);

export const updateProfile = (data, token) =>
  axios.put(
    `${API_BASE}/auth/update-profile`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );

const authHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

export const getSchools = (token) => axios.get(`${API_BASE}/schools`, authHeaders(token));
export const getSchool = (id, token) => axios.get(`${API_BASE}/schools/${id}`, authHeaders(token));
export const createSchool = (data, token) => axios.post(`${API_BASE}/schools`, data, authHeaders(token));
export const updateSchool = (id, data, token) => axios.put(`${API_BASE}/schools/${id}`, data, authHeaders(token));
export const deleteSchool = (id, token) => axios.delete(`${API_BASE}/schools/${id}`, authHeaders(token));

export const getSubscriptionPlans = (token) => axios.get(`${API_BASE}/subscription-plans`, authHeaders(token));
export const getSubscriptionPlan = (id, token) => axios.get(`${API_BASE}/subscription-plans/${id}`, id, authHeaders(token));
export const createSubscriptionPlan = (data, token) => axios.post(`${API_BASE}/subscription-plans`, data, authHeaders(token));
export const updateSubscriptionPlan = (id, data, token) => axios.put(`${API_BASE}/subscription-plans/${id}`, data, authHeaders(token));
export const deleteSubscriptionPlan = (id, token) => axios.delete(`${API_BASE}/subscription-plans/${id}`, authHeaders(token));

export const getSubscriptions = (token) => axios.get(`${API_BASE}/subscriptions`, authHeaders(token));
export const getSubscription = (id, token) => axios.get(`${API_BASE}/subscriptions/${id}`, authHeaders(token));
export const createSubscription = (data, token) => axios.post(`${API_BASE}/subscriptions`, data, authHeaders(token));
export const updateSubscription = (id, data, token) => axios.put(`${API_BASE}/subscriptions/${id}`, data, authHeaders(token));
export const deleteSubscription = (id, token) => axios.delete(`${API_BASE}/subscriptions/${id}`, authHeaders(token));

export const getPayments = (token) => axios.get(`${API_BASE}/payments`, authHeaders(token));
export const getPayment = (id, token) => axios.get(`${API_BASE}/payments/${id}`, authHeaders(token));
export const createPayment = (data, token) => axios.post(`${API_BASE}/payments`, data, authHeaders(token));
export const updatePayment = (id, data, token) => axios.put(`${API_BASE}/payments/${id}`, data, authHeaders(token));
export const deletePayment = (id, token) => axios.delete(`${API_BASE}/payments/${id}`, authHeaders(token));

export const getClasses = (token) => axios.get(`${API_BASE}/classes`, authHeaders(token));
export const getClass = (id, token) => axios.get(`${API_BASE}/classes/${id}`, authHeaders(token));
export const createClass = (data, token) => axios.post(`${API_BASE}/classes`, data, authHeaders(token));
export const updateClass = (id, data, token) => axios.put(`${API_BASE}/classes/${id}`, data, authHeaders(token));
export const deleteClass = (id, token) => axios.delete(`${API_BASE}/classes/${id}`, authHeaders(token));

export const getSubjects = (token) => axios.get(`${API_BASE}/subjects`, authHeaders(token));
export const getSubject = (id, token) => axios.get(`${API_BASE}/subjects/${id}`, authHeaders(token));
export const createSubject = (data, token) => axios.post(`${API_BASE}/subjects`, data, authHeaders(token));
export const updateSubject = (id, data, token) => axios.put(`${API_BASE}/subjects/${id}`, data, authHeaders(token));
export const deleteSubject = (id, token) => axios.delete(`${API_BASE}/subjects/${id}`, authHeaders(token));

export const getAttendances = (token) => axios.get(`${API_BASE}/attendance`, authHeaders(token));
export const getAttendance = (id, token) => axios.get(`${API_BASE}/attendance/${id}`, authHeaders(token));
export const createAttendance = (data, token) => axios.post(`${API_BASE}/attendance`, data, authHeaders(token));
export const updateAttendance = (id, data, token) => axios.put(`${API_BASE}/attendance/${id}`, data, authHeaders(token));
export const deleteAttendance = (id, token) => axios.delete(`${API_BASE}/attendance/${id}`, authHeaders(token));
