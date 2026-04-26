import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

function DummyScreen({ name }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0D' }}>
      <Text style={{ color: '#fff' }}>{name}</Text>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#0D0D0D' },
        tabBarActiveTintColor: '#fff'
      }}
    >
      <Tab.Screen name="Home" children={() => <DummyScreen name="Home" />} />
      <Tab.Screen name="Browse" children={() => <DummyScreen name="Browse" />} />
      <Tab.Screen name="Search" children={() => <DummyScreen name="Search" />} />
      <Tab.Screen name="Favorites" children={() => <DummyScreen name="Favorit" />} />
      <Tab.Screen name="About" children={() => <DummyScreen name="Profil" />} />
    </Tab.Navigator>
  );
}