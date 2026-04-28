import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl
} from 'react-native';
import { recipeApi } from '../api/recipeApi';

export default function BrowseScreen({ route, navigation }) {
  const cat = route?.params?.category ?? 'Beef';

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchRecipes(); }, [cat]);

  async function fetchRecipes() {
    setFailed(false);
    try {
      const res = await recipeApi.getRecipesByCategory(cat);
      setRecipes(res?.meals ?? []);
    } catch (e) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fetchRecipes();
    setRefreshing(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#5F6F52" />
        <Text style={styles.loadingText}>Mencari resep...</Text>
      </View>
    );
  }

  if (failed) {
    return (
      <View style={styles.center}>
        <Text style={styles.errMsg}>Gagal memuat resep</Text>
        <Text style={styles.errSub}>Periksa koneksi internet kamu</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchRecipes}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={recipes}
        keyExtractor={(item, idx) => item.idMeal ?? idx.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Detail', { recipeId: item.idMeal, title: item.strMeal })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.thumb} />
            <View style={styles.cardFooter}>
              <Text numberOfLines={2} style={styles.label}>{item.strMeal}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.heading}>Koleksi {cat}</Text>
            <Text style={styles.sub}>{recipes.length} resep tersedia</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Tidak ada resep</Text>
            <Text style={styles.emptyDesc}>Kategori ini belum tersedia</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#5F6F52" />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#FEFAE0' },
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#FEFAE0', padding: 24
  },
  loadingText: { color: '#5F6F52', marginTop: 10, fontSize: 13 },
  errMsg: { color: '#2C2C2C', fontSize: 16, fontWeight: '600' },
  errSub: { color: '#5F6F52', fontSize: 13, marginTop: 6, marginBottom: 20 },
  retryBtn: { paddingVertical: 10, paddingHorizontal: 28, backgroundColor: '#5F6F52', borderRadius: 20 },
  retryText: { color: '#FEFAE0', fontWeight: '700', fontSize: 14 },
  header: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 },
  heading: { color: '#2C2C2C', fontSize: 22, fontWeight: 'bold' },
  sub: { color: '#5F6F52', fontSize: 13, marginTop: 4 },
  card: {
    flex: 1, margin: 8, borderRadius: 16,
    backgroundColor: '#fff', overflow: 'hidden',
    borderWidth: 1, borderColor: '#A9B388'
  },
  thumb: { width: '100%', height: 160 },
  cardFooter: { padding: 12, minHeight: 52, justifyContent: 'center' },
  label: { color: '#2C2C2C', fontWeight: '600', fontSize: 13, textAlign: 'center' },
  empty: { marginTop: 80, alignItems: 'center', paddingHorizontal: 36 },
  emptyTitle: { color: '#2C2C2C', fontSize: 17, fontWeight: '700', marginBottom: 8 },
  emptyDesc: { color: '#5F6F52', fontSize: 13, textAlign: 'center' }
});