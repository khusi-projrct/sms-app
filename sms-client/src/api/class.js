import client from './client';

export const getClasses = () => client.get('/classes');
export const getClassById = (classId) => client.get(`/classes/${classId}`); 
export const createClass = (classData) => client.post('/classes', classData);
export const updateClass = (classId, classData) => client.put(`/classes/${classId}`, classData);
export const deleteClass = (classId) => client.delete(`/classes/${classId}`);