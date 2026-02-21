import client, { authHeaders } from "./client";

export const getClasses = (params, token) => {
  return client.get("/classes", {
    params,
    ...authHeaders(token),
  });
};

export const createClass = (data, token) => {
  return client.post("/classes", data, authHeaders(token));
};

export const updateClass = (id, data, token) => {
  return client.put(`/classes/${id}`, data, authHeaders(token));
};

export const deleteClass = (id, token) => {
  return client.delete(`/classes/${id}`, authHeaders(token));
};