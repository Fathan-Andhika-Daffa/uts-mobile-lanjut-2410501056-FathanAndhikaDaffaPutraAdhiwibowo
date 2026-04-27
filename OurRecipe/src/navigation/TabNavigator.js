import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

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
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorit' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}