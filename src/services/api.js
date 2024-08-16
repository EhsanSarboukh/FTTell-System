import axios from 'axios';

const API_URL = 'http://localhost:5001/chat';  // Corrected URL

export const getChatResponse = async (prompt) => {
  try {
    const response = await axios.post(API_URL, { prompt });
    return response.data;  // Ensure the response is correctly handled
  } catch (error) {
    console.error('Error fetching the chat response:', error);
    throw error;
  }
};
