import axios from 'axios';

const API_URL = 'http://localhost:5001/chat';  // Corrected URL
// The server processes the prompt and returns a response, which is then returned by this function.
export const getChatResponse = async (prompt) => {
  try {
    // Send a POST request to the chat server with the prompt
    const response = await axios.post(API_URL, { prompt });
    return response.data;  // Ensure the response is correctly handled, return the response data from the server
  } catch (error) {
    console.error('Error fetching the chat response:', error);
    throw error;
  }
};
