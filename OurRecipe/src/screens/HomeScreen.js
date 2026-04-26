import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { recipeApi } from '../api/recipeApi';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setHasError(false);
    setLoadingState(true);

    try {
      const res = await recipeApi.getCategories();
      let temp = [];

      if (res && res.data && res.data.categories) {
        temp = res.data.categories;
      }

      setItems(temp);
    } catch (e) {
      setHasError(true);
    }

    setLoadingState(false);
  };

  if (loadingState) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.text}>Memuat...</Text>
      </View>
    );
  }

  if (hasError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Terjadi kesalahan</Text>
        <TouchableOpacity style={styles.btn} onPress={loadData}>
          <Text style={styles.btnText}>Ulangi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderCard = ({ item }) => {
    const title = item.strCategory;
    const img = item.strCategoryThumb;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Browse', { category: title })}
      >
        <Image source={{ uri: img }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={items}
        renderItem={renderCard}
        keyExtractor={(item, i) => item.idCategory || String(i)}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0D0D0D'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D'
  },
  text: {
    color: '#fff',
    marginTop: 10
  },
  error: {
    color: '#ff4444',
    marginBottom: 15
  },
  btn: {
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8
  },
  btnText: {
    color: '#fff'
  },
  list: {
    padding: 10
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333'
  },
  image: {
    width: '100%',
    height: 80,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});