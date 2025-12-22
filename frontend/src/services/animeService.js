import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const animeService = {
  async getAnimeList(page = 1, limit = 12) {
    try {
      const response = await axios.get(`${API_BASE_URL}/anime`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching anime list:', error);
      throw error;
    }
  },

  async searchAnime(query, page = 1) {
    try {
      const response = await axios.get(`${API_BASE_URL}/anime`, {
        params: { q: query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  },

  async getAnimeDetails(animeId) {
    try {
      const response = await axios.get(`${JIKAN_BASE_URL}/anime/${animeId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching anime details:', error);
      throw error;
    }
  },

  async getRecommendations(animeList, topN = 10) {
    try {
      const response = await axios.post(`${API_BASE_URL}/recommend`, {
        anime_list: animeList,
        top_n: topN
      });
      return response.data.recommendations;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }
};

export default animeService;
