import client from './client';

export const getSchools = () => client.get('/schools');
export const getSchoolById = (schoolId) => client.get(`/schools/${schoolId}`);      
export const createSchool = (schoolData) => client.post('/schools', schoolData);
export const updateSchool = (schoolId, schoolData) => client.put(`/schools/${schoolId}`, schoolData);   
export const deleteSchool = (schoolId) => client.delete(`/schools/${schoolId}`);
