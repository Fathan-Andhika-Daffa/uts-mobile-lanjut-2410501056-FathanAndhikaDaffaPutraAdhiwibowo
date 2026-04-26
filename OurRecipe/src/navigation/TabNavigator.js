import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

function SimpleScreen(props) {
  const label = props?.name || '';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0D' }}>
      <Text style={{ color: '#fff' }}>{label}</Text>
    </View>
  );
}

export default function TabNavigator() {
  const screenOpt = {
    headerStyle: { backgroundColor: '#0D0D0D' },
    headerTintColor: '#fff',
    tabBarStyle: { backgroundColor: '#0D0D0D' },
    tabBarActiveTintColor: '#fff'
  };

  return (
    <Tab.Navigator screenOptions={screenOpt}>
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen
        name="Browse"
        children={() => <SimpleScreen name="Browse" />}
      />

      <Tab.Screen
        name="Search"
        children={() => <SimpleScreen name="Search" />}
      />

      <Tab.Screen
        name="Favorites"
        children={() => <SimpleScreen name="Favorit" />}
      />

      <Tab.Screen
        name="About"
        children={() => <SimpleScreen name="Profil" />}
      />
    </Tab.Navigator>
  );
}