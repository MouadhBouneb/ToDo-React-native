import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.133.117:8000', // Replace with your API endpoint
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken(); // Replace with your logic to get the access token

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Replace 'getAccessToken' with your logic to retrieve the access token
function getAccessToken() {
  // Replace this with your logic to get the access token from wherever it is stored
  return await AsyncStorage.getItem('accessToken');
}

export default instance;
