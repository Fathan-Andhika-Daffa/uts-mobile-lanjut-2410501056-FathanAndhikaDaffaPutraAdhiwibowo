import React from 'react';
import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import useFavoriteStore from '../store/favoriteStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FavoritesScreen({ navigation }) {
  const favorites = useFavoriteStore(state => state.favorites);
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  function openDetail(item) {
    navigation.navigate('Detail', { recipeId: item.idMeal, title: item.strMeal });
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
              <Icon name="favorite" size={22} color="#B99470" />
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
  main: { flex: 1, backgroundColor: '#FEFAE0' },
  header: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 10 },
  title: { color: '#2C2C2C', fontSize: 26, fontWeight: 'bold' },
  sub: { color: '#5F6F52', fontSize: 13, marginTop: 4 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 16,
    marginBottom: 12, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: '#A9B388'
  },
  img: { width: 100, height: 85 },
  info: { flex: 1, padding: 12 },
  name: { color: '#2C2C2C', fontSize: 14, fontWeight: '600', lineHeight: 19 },
  tagRow: { flexDirection: 'row', marginTop: 7, gap: 6 },
  tag: {
    backgroundColor: '#B99470', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3
  },
  tagText: { color: '#FEFAE0', fontSize: 10, fontWeight: '500' },
  removeBtn: { padding: 14 },
  empty: { marginTop: 80, alignItems: 'center', paddingHorizontal: 36 },
  emptyTitle: { color: '#2C2C2C', fontSize: 17, fontWeight: '700', marginBottom: 8 },
  emptyDesc: { color: '#5F6F52', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  exploreBtn: { backgroundColor: '#5F6F52', borderRadius: 22, paddingVertical: 11, paddingHorizontal: 28 },
  exploreBtnText: { color: '#FEFAE0', fontWeight: '700', fontSize: 14 }
});