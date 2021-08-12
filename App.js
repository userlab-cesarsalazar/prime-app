//yaimport { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react'
import Amplify, { Auth, Cache } from 'aws-amplify'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//components
import awsconfig from './aws-exports.js'
import Login from './views/login/loginView'
import Main from './views/main/mainView'

Amplify.configure(awsconfig)

import { View, StyleSheet, Text } from 'react-native'
//componets

export default function App() {
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    Auth.currentSession().then(creds => {
      console.log(creds)
      if (creds) {
        JSON.stringify(creds)
        Cache.setItem('mobile-app-user', JSON.stringify(creds))
        setIsLogged(true)
      }
    })
  })

  const getData = async data => {
    try {
      const user = await Auth.signIn(data.username, data.password)
      console.log(user, 'ueer')
      setIsLogged(true)
    } catch (error) {
      setIsLogged(false)
      console.log('error signing in', error)
    }
  }

  const Stack = createStackNavigator()
  return !isLogged ? (
    <View style={styles.container}>
      <Login handleChange={getData} doLoging={getData} />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Inicio' component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
})
