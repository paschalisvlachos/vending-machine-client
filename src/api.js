import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:3001/api';
// User registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// User login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Deposit coins
export const depositCoins = async (token, coins) => {
  const response = await axios.post(`${API_URL}/transactions/deposit`, { coins }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Buy product
export const buyProduct = async (token, productId, amount) => {
  const response = await axios.post(`${API_URL}/transactions/buy`, { productId, amount }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Reset deposit
export const resetDeposit = async (token) => {
  const response = await axios.post(`${API_URL}/transactions/reset`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};
