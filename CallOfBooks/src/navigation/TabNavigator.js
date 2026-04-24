import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

const DummyScreen = ({ name }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{name}</Text></View>
);

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" children={() => <DummyScreen name="Home Screen" />} />
      <Tab.Screen name="Browse" children={() => <DummyScreen name="Browse Screen" />} />
      <Tab.Screen name="Search" children={() => <DummyScreen name="Search Screen" />} />
      <Tab.Screen name="Favorites" children={() => <DummyScreen name="Favorites Screen" />} />
    </Tab.Navigator>
  );
}