import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import BrowseScreen from '../screens/BrowseScreen';

const Tab = createBottomTabNavigator();

function SimpleScreen(props) {
  const label = props?.name || '';

  const upper = label.toUpperCase();

  return (
    <View style={styles.centerWrap}>
      <View style={styles.box}>
        <Text style={styles.title}>{upper}</Text>

        <View style={styles.line} />

        <Text style={styles.desc}>
          Bagian {label} belum tersedia
        </Text>
      </View>
    </View>
  );
}

export default function TabNavigator() {
  const options = {
    headerStyle: {
      backgroundColor: '#0D0D0D',
      borderBottomWidth: 1,
      borderBottomColor: '#222'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      letterSpacing: 1
    },

    tabBarStyle: {
      backgroundColor: '#0D0D0D',
      borderTopWidth: 1,
      borderTopColor: '#222',
      height: 60,
      paddingBottom: 18
    },
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: '#555',
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    tabBarIconStyle: {
      display: 'none'
    }
  };

  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Browse"
        component={BrowseScreen}
      />

      <Tab.Screen name="Search">
        {() => <SimpleScreen name="Search" />}
      </Tab.Screen>

      <Tab.Screen name="Favorites">
        {() => <SimpleScreen name="Favorit" />}
      </Tab.Screen>

      <Tab.Screen name="About">
        {() => <SimpleScreen name="Profil" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    padding: 28
  },
  box: {
    width: '100%',
    padding: 24,
    borderRadius: 14,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333'
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 1.5
  },
  line: {
    width: 36,
    height: 2,
    backgroundColor: '#fff',
    marginVertical: 14
  },
  desc: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18
  }
});