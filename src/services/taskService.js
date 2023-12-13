import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'http://192.168.133.117:8000/api/to-do';

export const getTasks = async (status = 0) => {
  const token = await AsyncStorage.getItem("token")
  console.log("tokennnn", token);
  try {
    const response = await axios.get(BASE_URL, {
      params: { state: status },
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const token = await AsyncStorage.getItem("token")
    console.log("tokennnn", token);
    console.log("toek", taskData)
    const response = await axios.post(BASE_URL, taskData, {
      headers: {
        'Accept': 'application/json', "Content-Type": "application/json",
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTaskApi = async (taskData, taskId) => {
  try {
    const token = await AsyncStorage.getItem("token")
    console.log("tokennnn", token);
    const response = await axios.put(`${BASE_URL}/${taskId}`, taskData, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const token = await AsyncStorage.getItem("token")
    console.log("tokennnn", token);
    const response = await axios.delete(`${BASE_URL}/${taskId}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
