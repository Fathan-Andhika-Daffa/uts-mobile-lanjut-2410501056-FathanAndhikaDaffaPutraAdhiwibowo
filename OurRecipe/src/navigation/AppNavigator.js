import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Detail" 
        children={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0D' }}>
            <Text style={{ color: '#fff' }}>Detail Resep (Placeholder)</Text>
          </View>
        )} 
      />
    </Stack.Navigator>
  );
}