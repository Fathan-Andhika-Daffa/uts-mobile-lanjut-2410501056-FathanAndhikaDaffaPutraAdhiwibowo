import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

const tabOptions = {
  headerStyle: {
    backgroundColor: '#5F6F52',
    borderBottomWidth: 1,
    borderBottomColor: '#A9B388'
  },
  headerTintColor: '#FEFAE0',
  headerTitleStyle: { fontWeight: 'bold', letterSpacing: 0.5 },
  tabBarStyle: {
    backgroundColor: '#5F6F52',
    borderTopWidth: 1,
    borderTopColor: '#A9B388',
    height: 80,
    paddingBottom: 20,
    paddingTop: 8
  },
  tabBarActiveTintColor: '#FEFAE0',
  tabBarInactiveTintColor: '#A9B388',
  tabBarLabelStyle: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  tabBarIconStyle: { display: 'flex' }
};

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorit',
          tabBarIcon: ({ color, size }) => <Icon name="favorite" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <Icon name="person" color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}