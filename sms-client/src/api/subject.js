import client from './client';

export const getSubjects = (token) => client.get('/subjects', client.authHeaders(token));
export const getSubject = (id, token) => client.get(`/subjects/${id}`, client.authHeaders(token));
export const createSubject = (data, token) => client.post('/subjects', data, client.authHeaders(token));
export const updateSubject = (id, data, token) => client.put(`/subjects/${id}`, data, client.authHeaders(token));
export const deleteSubject = (id, token) => client.delete(`/subjects/${id}`, client.authHeaders(token));