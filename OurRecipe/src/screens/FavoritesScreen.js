import React from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import useFavoriteStore from '../store/favoriteStore';

export default function FavoritesScreen({ navigation }) {
  const favorites = useFavoriteStore(state => state.favorites);
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  function openDetail(item) {
    navigation.navigate('Detail', {
      recipeId: item.idMeal,
      title: item.strMeal
    });
  }

  return (
    <View style={styles.main}>
      <FlatList
        data={favorites}
        keyExtractor={item => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => openDetail(item)}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.img} />
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.name}>{item.strMeal}</Text>
              <View style={styles.tagRow}>
                {item.strCategory ? (
                  <View style={styles.tag}><Text style={styles.tagText}>{item.strCategory}</Text></View>
                ) : null}
                {item.strArea ? (
                  <View style={styles.tag}><Text style={styles.tagText}>{item.strArea}</Text></View>
                ) : null}
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => toggleFavorite(item)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={{ fontSize: 18 }}>❤️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Favorit</Text>
            <Text style={styles.sub}>
              {favorites.length > 0
                ? `${favorites.length} resep tersimpan`
                : 'Belum ada yang disimpan'}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Belum ada favorit</Text>
            <Text style={styles.emptyDesc}>
              Tambahkan resep ke favorit dengan menekan ikon hati di halaman detail
            </Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreBtnText}>Jelajahi Resep</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#0D0D0D' },
  header: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 10 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  sub: { color: '#666', fontSize: 13, marginTop: 4 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A1A1A', marginHorizontal: 16,
    marginBottom: 12, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: '#2a2a2a'
  },
  img: { width: 100, height: 85 },
  info: { flex: 1, padding: 12 },
  name: { color: '#fff', fontSize: 14, fontWeight: '600', lineHeight: 19 },
  tagRow: { flexDirection: 'row', marginTop: 7, gap: 6 },
  tag: {
    backgroundColor: '#111', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: '#333'
  },
  tagText: { color: '#777', fontSize: 10 },
  removeBtn: { padding: 14 },
  empty: { marginTop: 80, alignItems: 'center', paddingHorizontal: 36 },
  emptyIcon: { fontSize: 48, marginBottom: 14 },
  emptyTitle: { color: '#fff', fontSize: 17, fontWeight: '700', marginBottom: 8 },
  emptyDesc: { color: '#555', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  exploreBtn: { backgroundColor: '#fff', borderRadius: 22, paddingVertical: 11, paddingHorizontal: 28 },
  exploreBtnText: { color: '#000', fontWeight: '700', fontSize: 14 }
});