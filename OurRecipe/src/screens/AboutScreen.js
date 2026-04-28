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
  root: { flex: 1, backgroundColor: '#FEFAE0' },
  wrap: { padding: 20, alignItems: 'center' },
  profileSection: { alignItems: 'center', marginTop: 24, marginBottom: 28 },
  avatar: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: '#5F6F52', justifyContent: 'center',
    alignItems: 'center', marginBottom: 14,
    borderWidth: 3, borderColor: '#A9B388'
  },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#FEFAE0' },
  name: { color: '#2C2C2C', fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  nim: { color: '#5F6F52', fontSize: 14, marginTop: 5 },
  card: {
    width: '100%', backgroundColor: '#fff',
    padding: 18, borderRadius: 16,
    borderWidth: 1, borderColor: '#A9B388', marginBottom: 16
  },
  cardTitle: {
    color: '#A9B388', fontSize: 11, fontWeight: '700',
    letterSpacing: 1.2, marginBottom: 14
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 },
  rowLabel: { color: '#5F6F52', fontSize: 14 },
  rowValue: { color: '#2C2C2C', fontSize: 14, fontWeight: '500', flexShrink: 1, textAlign: 'right', marginLeft: 12 },
  sep: { height: 1, backgroundColor: '#A9B388', marginVertical: 10 },
  desc: { color: '#5F6F52', fontSize: 14, lineHeight: 20, marginBottom: 14 },
  linkBtn: {
    backgroundColor: '#5F6F52', borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 16,
    alignSelf: 'flex-start'
  },
  linkBtnText: { color: '#FEFAE0', fontWeight: '700', fontSize: 13 },
  footer: { color: '#A9B388', fontSize: 12, marginTop: 8, marginBottom: 20 }
});