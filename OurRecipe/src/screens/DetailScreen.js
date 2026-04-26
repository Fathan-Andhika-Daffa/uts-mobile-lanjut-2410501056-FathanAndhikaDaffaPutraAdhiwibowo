import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet,
  ActivityIndicator, SafeAreaView, Dimensions
} from 'react-native';
import { recipeApi } from '../api/recipeApi';

const screen = Dimensions.get('window');

export default function DetailScreen({ route }) {
  const params = route?.params || {};
  const id = params.recipeId || '';

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDetail();
  }, [id]);

  const loadDetail = async () => {
    setIsLoading(true);

    try {
      const res = await recipeApi.getRecipeDetail(id);

      if (res && res.meals && res.meals.length > 0) {
        setData(res.meals[0]);
      } else {
        setData(null);
      }
    } catch (e) {
    }

    setIsLoading(false);
  };

  const buildIngredients = () => {
    let list = [];

    if (!data) return list;

    for (let i = 1; i <= 20; i++) {
      const ing = data['strIngredient' + i];
      const meas = data['strMeasure' + i];

      if (ing && ing.trim() !== '') {
        const text = meas ? ing + ' (' + meas + ')' : ing;
        list.push(text);
      }
    }

    return list;
  };

  if (isLoading) {
    return (
      <View style={styles.centerWrap}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.centerWrap}>
        <Text style={{ color: '#777' }}>Data tidak ditemukan</Text>
      </View>
    );
  }

  const ingredients = buildIngredients();

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView>
        <Image source={{ uri: data.strMealThumb }} style={styles.banner} />

        <View style={styles.content}>
          <Text style={styles.title}>{data.strMeal}</Text>

          <Text style={styles.meta}>
            {data.strCategory} | {data.strArea}
          </Text>

          <View style={styles.line} />

          <Text style={styles.section}>Bahan</Text>

          {ingredients.map((it, idx) => (
            <Text key={idx} style={styles.itemText}>
              • {it}
            </Text>
          ))}

          <View style={styles.line} />

          <Text style={styles.section}>Instruksi</Text>

          <Text style={styles.desc}>
            {data.strInstructions}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0D0D0D'
  },
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D'
  },
  banner: {
    width: screen.width,
    height: 280
  },
  content: {
    padding: 18
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  meta: {
    color: '#888',
    fontSize: 13,
    marginTop: 4
  },
  line: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 18
  },
  section: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8
  },
  itemText: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20
  },
  desc: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'justify'
  }
});