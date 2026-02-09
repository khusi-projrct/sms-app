import client from './client';

export const getAttendance = (token) => client.get('/attendance', client.authHeaders(token));
export const getAttendanceById = (id, token) => client.get(`/attendance/${id}`, client.authHeaders(token));
export const createAttendance = (data, token) => client.post('/attendance', data, client.authHeaders(token));
export const updateAttendance = (id, data, token) => client.put(`/attendance/${id}`, data, client.authHeaders(token));
export const deleteAttendance = (id, token) => client.delete(`/attendance/${id}`, client.authHeaders(token));