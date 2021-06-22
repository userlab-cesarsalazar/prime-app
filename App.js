//yaimport { StatusBar } from "expo-status-bar";
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//import Login from "./views/login/loginView";
import { Translations } from '@aws-amplify/ui-components'
import Amplify, { I18n } from 'aws-amplify'
import awsconfig from './aws-exports.js'
Amplify.configure(awsconfig)
//import { Authenticator } from 'aws-amplify-react-native'
import { withAuthenticator } from 'aws-amplify-react-native'
//componets
import Main from './views/main/mainView'

/*
export default function App() {
  const getData = (data) => {
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <Login handleChange={getData} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});*/

I18n.putVocabulariesForLanguage('en-US', {
  [Translations.SIGN_IN_HEADER_TEXT]: 'Inciar',
  [Translations.SIGN_IN_ACTION]: 'Entrar',
  [Translations.USERNAME_LABEL]: 'Usuario *',
  [Translations.USERNAME_PLACEHOLDER]: 'Ingrese Email',
  [Translations.PASSWORD_LABEL]: 'Contraseña *',
  [Translations.PASSWORD_PLACEHOLDER]: 'Ingrese Contraseña',
  [Translations.FORGOT_PASSWORD_TEXT]: '¿Olvido su contraseña?',
  [Translations.USERNAME_PLACEHOLDER]: 'Entre sua Usuário',
  [Translations.USERNAME_LABEL]: 'Digite seu usuario',
})
console.log('here')
I18n.setLanguage('en-US')

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default withAuthenticator(App, true)
