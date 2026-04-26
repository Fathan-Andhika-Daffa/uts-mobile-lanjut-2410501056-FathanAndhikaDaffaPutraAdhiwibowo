import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
});

export const recipeApi = {
  getCategories: () => api.get('/categories.php'),
  getRecipesByCategory: (category) => api.get(`/filter.php?c=${category}`),
  searchRecipes: (query) => api.get(`/search.php?s=${query}`)
};