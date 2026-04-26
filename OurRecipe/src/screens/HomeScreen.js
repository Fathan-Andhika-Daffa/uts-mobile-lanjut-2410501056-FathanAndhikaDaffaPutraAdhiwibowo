import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { recipeApi } from '../api/recipeApi';

export default function HomeScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setErrorFlag(false);
    setLoading(true);

    try {
      const res = await recipeApi.getCategories();

      let data = [];

      if (res && res.categories) {
        data = res.categories;
      }

      setList(data);
    } catch (err) {
      setErrorFlag(true);
      console.log('home error:', err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Memuat kategori...</Text>
      </View>
    );
  }

  if (errorFlag) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Gagal load data</Text>
        <TouchableOpacity style={styles.btn} onPress={init}>
          <Text style={styles.btnText}>Coba lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const name = item.strCategory;
    const img = item.strCategoryThumb;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Browse', { category: name })}
      >
        <Image source={{ uri: img }} style={styles.img} />
        <Text style={styles.title}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrap}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, i) => item.idCategory || i.toString()}
        numColumns={2}
        ListHeaderComponent={
          <View style={styles.top}>
            <Text style={styles.big}>Halo, mau masak apa?</Text>
            <Text style={styles.small}>Pilih kategori favoritmu</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
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
    color: '#777',
    marginTop: 10,
    fontSize: 14
  },
  error: {
    color: '#ff4444',
    marginBottom: 14,
    fontSize: 15
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: '#fff',
    borderRadius: 22
  },
  btnText: {
    color: '#000',
    fontWeight: '600'
  },
  top: {
    padding: 20,
    marginTop: 8
  },
  big: {
    color: '#fff',
    fontSize: 23,
    fontWeight: 'bold'
  },
  small: {
    color: '#777',
    fontSize: 13,
    marginTop: 4
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 18,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 2
  },
  img: {
    width: '100%',
    height: 90,
    resizeMode: 'contain'
  },
  title: {
    marginTop: 10,
    color: '#fff',
    fontSize: 15,
    fontWeight: '600'
  }
});