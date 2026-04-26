import axios from 'axios';
const BASE = 'https://www.themealdb.com/api/json/v1/1';

const http = axios.create({
  baseURL: BASE,
  timeout: 10000
});

http.interceptors.response.use(
  (res) => {
    if (!res) return {};
    return res.data ? res.data : {};
  },
  (err) => {
    let msg = 'Terjadi error';

    if (err && err.response) {
      msg = 'Server error: ' + err.response.status;
    } else if (err && err.request) {
      msg = 'Tidak ada respon';
    }

    console.log('api issue ->', msg);
    return Promise.reject(msg);
  }
);

const getCategories = () => {
  return http.get('/categories.php');
};

const getRecipesByCategory = (cat) => {
  const url = '/filter.php?c=' + (cat || '');
  return http.get(url);
};

const getRecipeDetail = (id) => {
  const endpoint = '/lookup.php?i=' + id;
  return http.get(endpoint);
};

const searchRecipes = (text) => {
  const q = text ? text : '';
  return http.get('/search.php?s=' + q);
};

const getRandomRecipe = () => {
  return http.get('/random.php');
};

export const recipeApi = {
  getCategories,
  getRecipesByCategory,
  getRecipeDetail,
  searchRecipes,
  getRandomRecipe
};