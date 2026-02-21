import client, { authHeaders } from "./client";

export const getSchools = (params, token) => {
    return client.get("/schools", {
        ...authHeaders(token),
        params,
    });
};

export const getAllSchools = (token) => {
  return client.get("/schools/all", authHeaders(token));
};

export const createSchool = (data, token) =>
  client.post("/schools", data, authHeaders(token));

export const updateSchool = (id, data, token) => 
  client.put(`/schools/${id}`, data, authHeaders(token));

export const deleteSchool = (id, token) =>
  client.delete(`/schools/${id}`, authHeaders(token));