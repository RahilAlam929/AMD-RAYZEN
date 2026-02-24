import apiClient from './apiClient';

export async function generateIdea(payload) {
  return apiClient.post('/ai/generate', payload);
}


