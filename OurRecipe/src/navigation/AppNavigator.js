import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const screenOpt = {
    headerStyle: {
      backgroundColor: '#0D0D0D'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 18
    },
    headerTitleAlign: 'center',
    headerShadowVisible: false,
    animation: 'slide_from_right',
    orientation: 'portrait',
    fullScreenGestureEnabled: true
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />

      <Stack.Navigator screenOptions={screenOpt}>
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => {
            const title = route?.params?.title || 'Detail Resep';

            return {
              title,
              headerBackTitle: 'Kembali',
              headerTransparent: false,
              animation: 'fade_from_bottom'
            };
          }}
        />
      </Stack.Navigator>
    </>
  );
}