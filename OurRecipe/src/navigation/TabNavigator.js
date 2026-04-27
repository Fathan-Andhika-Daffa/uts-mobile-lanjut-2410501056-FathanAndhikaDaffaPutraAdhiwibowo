import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

function PlaceholderScreen({ name }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Text style={styles.title}>{name.toUpperCase()}</Text>
        <View style={styles.divider} />
        <Text style={styles.desc}>Halaman {name} belum tersedia</Text>
      </View>
    </View>
  );
}

const tabOptions = {
  headerStyle: {
    backgroundColor: '#0D0D0D',
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e'
  },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold', letterSpacing: 0.5 },
  tabBarStyle: {
    backgroundColor: '#0D0D0D',
    borderTopWidth: 1,
    borderTopColor: '#1e1e1e',
    height: 60,
    paddingBottom: 10
  },
  tabBarActiveTintColor: '#fff',
  tabBarInactiveTintColor: '#444',
  tabBarLabelStyle: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  tabBarIconStyle: { display: 'none' }
};

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Browse" component={BrowseScreen} />
      <Tab.Screen name="Search">{() => <PlaceholderScreen name="Search" />}</Tab.Screen>
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorit' }} />
      <Tab.Screen name="About">{() => <PlaceholderScreen name="Profil" />}</Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0D', padding: 26 },
  card: {
    width: '100%', padding: 22, borderRadius: 14,
    backgroundColor: '#1A1A1A', borderWidth: 1,
    borderColor: '#222', alignItems: 'center'
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  divider: { height: 2, width: 32, backgroundColor: '#333', marginBottom: 14 },
  desc: { color: '#666', fontSize: 13, textAlign: 'center' }
});