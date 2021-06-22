import React from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PackagesScreen from '../packages/packajeView'
import SettingsScreen from '../settings/settingsView'
import HomeScreen from '../home/homeView'

function Preload() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>comming soon!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator()

function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          switch (route.name) {
            case 'Inicio':
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline'
              break
            case 'Paquetes':
              iconName = 'ios-list'
              break
            case 'Perfil':
              iconName = 'body-outline'
              break
            default:
              iconName = 'briefcase-outline'
              break
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name='Inicio' component={HomeScreen} />
      <Tab.Screen name='Paquetes' component={PackagesScreen} />
      <Tab.Screen name='Pre alerta' component={Preload} />
      <Tab.Screen name='Perfil' component={SettingsScreen} />
    </Tab.Navigator>
  )
}

export default Main
