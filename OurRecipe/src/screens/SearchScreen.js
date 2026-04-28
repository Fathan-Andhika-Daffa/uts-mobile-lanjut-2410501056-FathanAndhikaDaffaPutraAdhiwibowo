import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, Image, StyleSheet,
  ActivityIndicator, Keyboard, SafeAreaView
} from 'react-native';
import { recipeApi } from '../api/recipeApi';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  async function doSearch() {
    const trimmed = query.trim();
    if (!trimmed) { setMessage('Kolom pencarian tidak boleh kosong'); return; }
    if (trimmed.length < 3) { setMessage('Minimal 3 karakter ya'); return; }
    setMessage('');
    setLoading(true);
    setHasSearched(true);
    Keyboard.dismiss();
    try {
      const res = await recipeApi.searchRecipes(trimmed);
      const meals = res?.meals ?? [];
      setResults(meals);
      if (meals.length === 0) setMessage(`Tidak ada hasil untuk "${trimmed}"`);
    } catch (e) {
      setMessage('Sepertinya ada masalah koneksi');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery('');
    setResults([]);
    setMessage('');
    setHasSearched(false);
  }

  function openDetail(item) {
    navigation.navigate('Detail', { recipeId: item.idMeal, title: item.strMeal });
  }

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topBar}>
        <View style={[styles.inputWrap, message && query.length < 3 && styles.inputError]}>
          <TextInput
            style={styles.input}
            placeholder="Cari resep..."
            placeholderTextColor="#A9B388"
            value={query}
            onChangeText={val => { setQuery(val); if (val.length >= 3) setMessage(''); }}
            onSubmitEditing={doSearch}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={doSearch} activeOpacity={0.8}>
          <Text style={styles.searchBtnText}>Cari</Text>
        </TouchableOpacity>
      </View>

      {message ? (
        <View style={styles.msgWrap}>
          <Text style={styles.msgText}>{message}</Text>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#5F6F52" />
          <Text style={styles.loadingText}>Sedang mencari...</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.75}
              onPress={() => openDetail(item)}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.thumb} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.strMeal}</Text>
                <View style={styles.tagRow}>
                  {item.strCategory ? (
                    <View style={styles.tag}><Text style={styles.tagText}>{item.strCategory}</Text></View>
                  ) : null}
                  {item.strArea ? (
                    <View style={styles.tag}><Text style={styles.tagText}>{item.strArea}</Text></View>
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            results.length > 0 ? (
              <Text style={styles.resultCount}>{results.length} resep ditemukan</Text>
            ) : null
          }
          ListEmptyComponent={
            !hasSearched ? (
              <View style={styles.emptyWrap}>
                <Text style={styles.emptyTitle}>Cari resep apa hari ini?</Text>
                <Text style={styles.emptyDesc}>Ketik nama makanan lalu tekan Cari</Text>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FEFAE0' },
  topBar: { flexDirection: 'row', padding: 16, alignItems: 'center', gap: 10 },
  inputWrap: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12,
    paddingHorizontal: 12, borderWidth: 1, borderColor: '#A9B388', height: 48
  },
  inputError: { borderColor: '#cc6666' },
  input: { flex: 1, color: '#2C2C2C', fontSize: 14 },
  clearBtn: { color: '#A9B388', fontSize: 15, paddingLeft: 8 },
  searchBtn: {
    backgroundColor: '#5F6F52', borderRadius: 12,
    paddingHorizontal: 18, height: 48, justifyContent: 'center'
  },
  searchBtnText: { color: '#FEFAE0', fontWeight: '700', fontSize: 14 },
  msgWrap: { paddingHorizontal: 16, marginBottom: 6 },
  msgText: { color: '#cc6666', fontSize: 13 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#5F6F52', marginTop: 10, fontSize: 13 },
  resultCount: { color: '#5F6F52', fontSize: 13, marginBottom: 12 },
  card: {
    flexDirection: 'row', backgroundColor: '#fff',
    marginBottom: 12, borderRadius: 14, overflow: 'hidden',
    borderWidth: 1, borderColor: '#A9B388'
  },
  thumb: { width: 95, height: 90 },
  cardInfo: { flex: 1, padding: 12, justifyContent: 'center' },
  cardTitle: { color: '#2C2C2C', fontSize: 14, fontWeight: '600', lineHeight: 19 },
  tagRow: { flexDirection: 'row', marginTop: 7, gap: 6 },
  tag: {
    backgroundColor: '#B99470', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 3
  },
  tagText: { color: '#FEFAE0', fontSize: 10, fontWeight: '500' },
  emptyWrap: { alignItems: 'center', marginTop: 80 },
  emptyTitle: { color: '#2C2C2C', fontSize: 16, fontWeight: '600', marginBottom: 6 },
  emptyDesc: { color: '#5F6F52', fontSize: 13 }
});