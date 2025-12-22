const API_BASE_URL = 'http://localhost:8000';

export const searchAnime = async (query = '', page = 1, limit = 12, type = '') => {
  const params = new URLSearchParams({
    page,
    limit,
  });
  if (query) {
    params.append('q', query);
  }
  if (type) {
    params.append('type', type);
  }
  
  const response = await fetch(`${API_BASE_URL}/anime?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch anime');
  }
  return response.json();
};

export const getRecommendations = async (animeList, topN = 10) => {
  const response = await fetch(`${API_BASE_URL}/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      anime_list: animeList,
      top_n: topN,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to get recommendations');
  }
  return response.json();
};
