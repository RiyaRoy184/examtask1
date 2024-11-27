import axios from 'axios';

const API_URL = 'https://employee-management-server-5.onrender.com/users';


const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000, 
});


export const getUsers = async () => {
  try {
    const response = await fetch('https://employee-management-server-5.onrender.com/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const createUser = async (user) => {
  try {
    const response = await axiosInstance.post('/', user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.message);
    return null;
  }
};


export const updateUser = async (id, user) => {
  try {
    const response = await axiosInstance.put(`/${id}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.message);
    return null;
  }
};


export const deleteUser = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`);
    return id; 
  } catch (error) {
    console.error('Error deleting user:', error.message);
    return null;
  }
};