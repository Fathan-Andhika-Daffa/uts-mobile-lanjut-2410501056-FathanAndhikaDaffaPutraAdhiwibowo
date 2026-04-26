import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { recipeApi } from '../api/recipeApi';

export default function BrowseScreen({ route, navigation }) {
  const activeCategory = route?.params?.category || 'Beef';

  const [items, setItems] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => {
    loadAll();
  }, [activeCategory]);

  const loadAll = async () => {
    setIsBusy(true);
    await requestData();
    setIsBusy(false);
  };

  const refreshNow = async () => {
    setIsPulling(true);
    await requestData();
    setIsPulling(false);
  };

  const requestData = async () => {
    try {
      const res = await recipeApi.getRecipesByCategory(activeCategory);

      let arr = [];
      if (res && res.data) {
        arr = res.data.meals ? res.data.meals : [];
      }

      setItems(arr);
    } catch (e) {
    }
  };

  if (isBusy) {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Mencari resep...</Text>
      </View>
    );
  }

  const renderCard = ({ item }) => {
    const title = item.strMeal;
    const image = item.strMealThumb;

    return (
      <TouchableOpacity
        style={styles.cardBox}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('Detail', {
            recipeId: item.idMeal,
            title: title
          })
        }
      >
        <Image source={{ uri: image }} style={styles.img} />

        <View style={styles.textArea}>
          <Text style={styles.titleText} numberOfLines={2}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const total = items.length;

  return (
    <View style={styles.main}>
      <FlatList
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, i) => item.idMeal || i.toString()}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Koleksi {activeCategory}</Text>
            <Text style={styles.headerSub}>{total} menu</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Tidak ada data</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isPulling} onRefresh={refreshNow} tintColor="#fff" />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 10
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D'
  },
  loadingText: {
    color: '#777',
    marginTop: 10,
    fontSize: 13
  },
  header: {
    marginVertical: 20,
    marginLeft: 10
  },
  headerTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  headerSub: {
    color: '#777',
    fontSize: 13,
    marginTop: 3
  },
  cardBox: {
    flex: 1,
    margin: 8,
    borderRadius: 18,
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 3
  },
  img: {
    width: '100%',
    height: 160
  },
  textArea: {
    padding: 12,
    justifyContent: 'center',
    minHeight: 70
  },
  titleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  emptyBox: {
    marginTop: 50,
    alignItems: 'center'
  },
  emptyText: {
    color: '#777',
    fontSize: 15
  }
});