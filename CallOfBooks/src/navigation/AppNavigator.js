import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetail" children={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Detail Buku</Text></View>
      )} />
    </Stack.Navigator>
  );
}