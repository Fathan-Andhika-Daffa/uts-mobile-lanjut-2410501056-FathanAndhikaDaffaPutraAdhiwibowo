import { create } from 'zustand';

const useFavoriteStore = create((set, get) => ({
  favorites: [],

  toggleFavorite(meal) {
    if (!meal?.idMeal) return;
    const exists = get().favorites.some(m => m.idMeal === meal.idMeal);
    set(state => ({
      favorites: exists
        ? state.favorites.filter(m => m.idMeal !== meal.idMeal)
        : [...state.favorites, meal]
    }));
  },

  isFavorite(id) {
    if (!id) return false;
    return get().favorites.some(m => m.idMeal === id);
  }
}));

export default useFavoriteStore;