import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { recipeApi } from '../api/recipeApi';

export default function BrowseScreen({ route, navigation }) {
  const cat = route?.params?.category || 'Beef';

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pulling, setPulling] = useState(false);

  useEffect(() => {
    initLoad();
  }, [cat]);

  const initLoad = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  const handleRefresh = async () => {
    setPulling(true);
    await fetchData();
    setPulling(false);
  };

  const fetchData = async () => {
    try {
      const res = await recipeApi.getRecipesByCategory(cat);

      let list = [];

      if (res && res.meals) {
        list = res.meals;
      }

      setDataList(list);
    } catch (err) {
      setDataList([]);
      console.log('fetch error:', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingTxt}>Mencari resep...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const name = item.strMeal;
    const img = item.strMealThumb;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate('Detail', {
            recipeId: item.idMeal,
            title: name
          })
        }
      >
        <Image source={{ uri: img }} style={styles.image} />

        <View style={styles.textBox}>
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const total = dataList.length;

  return (
    <View style={styles.wrap}>
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item, idx) => item.idMeal || idx.toString()}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Koleksi {cat}</Text>
            <Text style={styles.sub}>{total} item</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Tidak ada data</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={pulling}
            onRefresh={handleRefresh}
            tintColor="#fff"
          />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    paddingHorizontal: 10
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D'
  },
  loadingTxt: {
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
    fontSize: 24,
    fontWeight: 'bold'
  },
  sub: {
    color: '#777',
    fontSize: 13,
    marginTop: 3
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 16,
    backgroundColor: '#1A1A1A',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 3
  },
  image: {
    width: '100%',
    height: 160
  },
  textBox: {
    padding: 12,
    minHeight: 70,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
  empty: {
    marginTop: 50,
    alignItems: 'center'
  },
  emptyText: {
    color: '#777',
    fontSize: 14
  }
});