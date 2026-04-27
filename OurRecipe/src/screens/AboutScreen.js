import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  SafeAreaView, Linking, TouchableOpacity
} from 'react-native';

const INFO_ROWS = [
  { label: 'Fakultas', value: 'Ilmu Komputer' },
  { label: 'Program Studi', value: 'D3 Sistem Informasi' },
  { label: 'Mata Kuliah', value: 'Pemrograman Mobile Lanjut' },
  { label: 'Tema UTS', value: 'Tema A: ResepKita' }
];

export default function AboutScreen() {
  function openMealDbDocs() {
    Linking.openURL('https://www.themealdb.com/api.php');
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.wrap} showsVerticalScrollIndicator={false}>

        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>FA</Text>
          </View>
          <Text style={styles.name}>Fathan Andhika Daffa Putra Adhiwibowo</Text>
          <Text style={styles.nim}>2410501056</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>DETAIL MAHASISWA</Text>
          {INFO_ROWS.map((item, i) => (
            <View key={i}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowValue}>{item.value}</Text>
              </View>
              {i < INFO_ROWS.length - 1 && <View style={styles.sep} />}
            </View>
          ))}
        </View>
        
        <Text style={styles.footer}>TA 2025/2026 • FIK UPNVJ</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D0D' },
  wrap: { padding: 20, alignItems: 'center' },
  profileSection: { alignItems: 'center', marginTop: 24, marginBottom: 28 },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#fff', justifyContent: 'center',
    alignItems: 'center', marginBottom: 14,
    borderWidth: 3, borderColor: '#2a2a2a'
  },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#000' },
  name: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  nim: { color: '#666', fontSize: 14, marginTop: 5 },
  card: {
    width: '100%', backgroundColor: '#1A1A1A',
    padding: 18, borderRadius: 16,
    borderWidth: 1, borderColor: '#2a2a2a', marginBottom: 16
  },
  cardTitle: {
    color: '#555', fontSize: 11, fontWeight: '700',
    letterSpacing: 1.2, marginBottom: 14
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 },
  rowLabel: { color: '#666', fontSize: 14 },
  rowValue: { color: '#ddd', fontSize: 14, fontWeight: '500', flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  sep: { height: 1, backgroundColor: '#222', marginVertical: 10 },
  desc: { color: '#888', fontSize: 14, lineHeight: 20, marginBottom: 14 },
  linkBtn: {
    backgroundColor: '#fff', borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 16,
    alignSelf: 'flex-start'
  },
  linkBtnText: { color: '#000', fontWeight: '700', fontSize: 13 },
  footer: { color: '#333', fontSize: 12, marginTop: 8, marginBottom: 20 }
});