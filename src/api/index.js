import axios from 'axios';

const API_URL = 'https://vegit.pythonanywhere.com/api'; // Замените на адрес вашего сервера, если он размещен удаленно

export const getParks = async () => {
  const response = await axios.get(`${API_URL}/getParks`);
  return response.data;
};

export const getParksWithProblems = async () => {
  const response = await axios.get(`${API_URL}/parksWithProblems`);
  return response.data;
};

export const getParksWithoutProblems = async () => {
  const response = await axios.get(`${API_URL}/parksWithoutProblems`);
  return response.data;
};

export const getParksProblems = async (parkId) => {
  const response = await axios.get(`${API_URL}/parksProblems/${parkId}`);
  return response.data;
};

export const deleteProblem = async (problemId) => {
  const response = await axios.delete(`${API_URL}/deleteProblem/${problemId}`);
  return response.data;
};

export const addProblem = async (problemData) => {
  const response = await axios.post(`${API_URL}/addProblem`, problemData);
  return response.data;
};

export const addPark = async (parkData) => {
  const response = await axios.post(`${API_URL}/addPark`, parkData);
  return response.data;
};
