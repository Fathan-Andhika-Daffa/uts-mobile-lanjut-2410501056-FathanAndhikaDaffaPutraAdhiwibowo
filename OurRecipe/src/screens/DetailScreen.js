import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  ActivityIndicator, SafeAreaView, Dimensions,
  TouchableOpacity
} from 'react-native';
import { recipeApi } from '../api/recipeApi';
import useFavoriteStore from '../store/favoriteStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: screenWidth } = Dimensions.get('window');

export default function DetailScreen({ route }) {
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);
  const isFavorite = useFavoriteStore(state => state.isFavorite);
  const recipeId = route?.params?.recipeId ?? '';

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => { loadDetail(); }, [recipeId]);

  async function loadDetail() {
    setLoading(true);
    setLoadFailed(false);
    try {
      const res = await recipeApi.getRecipeDetail(recipeId);
      const found = res?.meals?.[0] ?? null;
      if (!found) setLoadFailed(true);
      setMeal(found);
    } catch (e) {
      setLoadFailed(true);
    } finally {
      setLoading(false);
    }
  }

  function getIngredients() {
    if (!meal) return [];
    const result = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing?.trim()) {
        result.push({ ingredient: ing.trim(), measure: measure?.trim() ?? '' });
      }
    }
    return result;
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5F6F52" />
        <Text style={styles.loadingText}>Memuat resep...</Text>
      </View>
    );
  }

  if (loadFailed || !meal) {
    return (
      <View style={styles.centered}>
        <Text style={styles.failText}>Resep tidak ditemukan</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={loadDetail}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const ingredients = getIngredients();
  const favorited = isFavorite(meal.idMeal);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={{ uri: meal.strMealThumb }} style={styles.banner} />
          <TouchableOpacity
            style={styles.favBtn}
            activeOpacity={0.8}
            onPress={() => toggleFavorite(meal)}
          >
            <Icon
              name={favorited ? 'favorite' : 'favorite-border'}
              size={24}
              color={favorited ? '#B99470' : '#A9B388'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{meal.strMeal}</Text>
          <View style={styles.tagRow}>
            {meal.strCategory ? (
              <View style={styles.tag}><Text style={styles.tagText}>{meal.strCategory}</Text></View>
            ) : null}
            {meal.strArea ? (
              <View style={styles.tag}><Text style={styles.tagText}>{meal.strArea}</Text></View>
            ) : null}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Bahan-bahan</Text>
          <Text style={styles.sectionSub}>{ingredients.length} bahan dibutuhkan</Text>
          <View style={styles.ingredientGrid}>
            {ingredients.map((item, i) => (
              <View key={i} style={styles.ingredientChip}>
                <Text style={styles.chipIngredient}>{item.ingredient}</Text>
                {item.measure ? <Text style={styles.chipMeasure}>{item.measure}</Text> : null}
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Cara Memasak</Text>
          {meal.strInstructions
            ?.replace(/\r\n/g, '\n')
            .split('\n')
            .filter(line => line.trim())
            .map((para, i) => (
              <Text key={i} style={styles.instructions}>{para.trim()}</Text>
            ))
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FEFAE0' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEFAE0' },
  loadingText: { color: '#5F6F52', marginTop: 10, fontSize: 13 },
  failText: { color: '#2C2C2C', fontSize: 15, fontWeight: '600', marginBottom: 16 },
  retryBtn: { paddingVertical: 10, paddingHorizontal: 24, backgroundColor: '#5F6F52', borderRadius: 20 },
  retryText: { color: '#FEFAE0', fontWeight: '700' },
  banner: { width: screenWidth, height: 280 },
  favBtn: {
    position: 'absolute', right: 20, bottom: -22,
    backgroundColor: '#FEFAE0', width: 52, height: 52,
    borderRadius: 26, justifyContent: 'center', alignItems: 'center',
    elevation: 5, borderWidth: 1, borderColor: '#A9B388'
  },
  body: { padding: 18, paddingTop: 32 },
  name: { color: '#2C2C2C', fontSize: 22, fontWeight: 'bold', lineHeight: 28 },
  tagRow: { flexDirection: 'row', marginTop: 10, gap: 8 },
  tag: {
    backgroundColor: '#B99470', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5
  },
  tagText: { color: '#FEFAE0', fontSize: 12, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#A9B388', marginVertical: 20 },
  sectionTitle: { color: '#2C2C2C', fontSize: 16, fontWeight: 'bold' },
  sectionSub: { color: '#5F6F52', fontSize: 12, marginTop: 3, marginBottom: 14 },
  ingredientGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  ingredientChip: {
    backgroundColor: '#fff', borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: '#A9B388', minWidth: 90
  },
  chipIngredient: { color: '#2C2C2C', fontSize: 12, fontWeight: '600' },
  chipMeasure: { color: '#5F6F52', fontSize: 11, marginTop: 2 },
  instructions: { color: '#2C2C2C', fontSize: 14, lineHeight: 22, marginBottom: 12, textAlign: 'justify' }
});