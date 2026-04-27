import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet,
  RefreshControl
} from 'react-native';
import { recipeApi } from '../api/recipeApi';

function SkeletonCard() {
  return (
    <View style={[styles.card, styles.skeleton]}>
      <View style={styles.skeletonThumb} />
      <View style={styles.skeletonLabel} />
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setFailed(false);
    try {
      const res = await recipeApi.getCategories();
      setCategories(res?.categories ?? []);
    } catch (e) {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await fetchCategories();
    setRefreshing(false);
  }

  if (loading) {
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonSub} />
        </View>
        <View style={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </View>
      </View>
    );
  }

  if (failed) {
    return (
      <View style={styles.center}>
        <Text style={styles.errIcon}>⚠️</Text>
        <Text style={styles.errMsg}>Gagal memuat kategori</Text>
        <Text style={styles.errSub}>Periksa koneksi internet kamu</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={fetchCategories}>
          <Text style={styles.retryText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={categories}
        keyExtractor={item => item.idCategory}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Browse', { category: item.strCategory })}
          >
            <Image source={{ uri: item.strCategoryThumb }} style={styles.thumb} />
            <View style={styles.cardFooter}>
              <Text style={styles.label}>{item.strCategory}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.greeting}>Halo, mau masak apa?</Text>
            <Text style={styles.sub}>{categories.length} kategori tersedia</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#fff" />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#0D0D0D' },
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#0D0D0D', padding: 24
  },
  header: { paddingHorizontal: 16, paddingTop: 20, paddingBottom: 8 },
  greeting: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  sub: { color: '#666', fontSize: 13, marginTop: 4 },
  card: {
    flex: 1, margin: 8, borderRadius: 16,
    backgroundColor: '#1A1A1A', overflow: 'hidden',
    borderWidth: 1, borderColor: '#2a2a2a'
  },
  thumb: { width: '100%', height: 90, resizeMode: 'contain', marginTop: 12 },
  cardFooter: { padding: 12, alignItems: 'center' },
  label: { color: '#fff', fontWeight: '600', fontSize: 13 },
  errIcon: { fontSize: 36, marginBottom: 12 },
  errMsg: { color: '#fff', fontSize: 16, fontWeight: '600' },
  errSub: { color: '#666', fontSize: 13, marginTop: 6, marginBottom: 20 },
  retryBtn: { paddingVertical: 10, paddingHorizontal: 28, backgroundColor: '#fff', borderRadius: 20 },
  retryText: { color: '#000', fontWeight: '700', fontSize: 14 },
  skeletonGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8 },
  skeleton: { opacity: 0.35 },
  skeletonThumb: { width: '100%', height: 90, backgroundColor: '#2a2a2a', borderRadius: 8, marginTop: 12 },
  skeletonLabel: { height: 12, width: '60%', backgroundColor: '#2a2a2a', borderRadius: 6, margin: 12, alignSelf: 'center' },
  skeletonTitle: { height: 20, width: '50%', backgroundColor: '#1e1e1e', borderRadius: 6, marginBottom: 8 },
  skeletonSub: { height: 12, width: '30%', backgroundColor: '#1e1e1e', borderRadius: 6 }
});