import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';
import BrowseScreen from '../screens/BrowseScreen';

const Stack = createNativeStackNavigator();

const stackOptions = {
  headerStyle: { backgroundColor: '#5F6F52' },
  headerTintColor: '#FEFAE0',
  headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  animation: 'slide_from_right',
  orientation: 'portrait',
  fullScreenGestureEnabled: true
};

export default function AppNavigator() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#5F6F52" />
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Browse"
          component={BrowseScreen}
          options={({ route }) => ({
            title: route?.params?.category ?? 'Browse',
            headerBackTitle: 'Kembali',
            animation: 'slide_from_right'
          })}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({
            title: route?.params?.title ?? 'Detail Resep',
            headerBackTitle: 'Kembali',
            animation: 'fade_from_bottom'
          })}
        />
      </Stack.Navigator>
    </>
  );
}