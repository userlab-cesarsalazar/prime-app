import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { SafeAreaView, StyleSheet, TextInput, Button, View, Image, Text } from 'react-native'
import messagesApp from '../globals/messagesApp'
import { CustomText } from '../globals/Components/CustomText'

export default function Login(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = data => {
    props.doLoging(data)
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: 'https://images-traestodo.s3.amazonaws.com/Logo_NowExpressCourier.jpg',
          }}
        />
        <CustomText value={messagesApp.APP_TITTLE}></CustomText>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*(\+[a-z0-9-]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
          }}
          render={({ field: { onChange, onBlur, username } }) => (
            <TextInput style={styles.input} onChangeText={onChange} value={username} />
          )}
          name='username'
        />
        {errors.username?.type === 'required' && (
          <CustomText value={messagesApp.EMAIL_REQUIRED} type={'error'}>
            {' '}
          </CustomText>
        )}
        {errors.username?.type === 'pattern' && (
          <CustomText value={messagesApp.EMAIL_NOT_VALID} type={'error'}>
            {' '}
          </CustomText>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, password } }) => (
            <TextInput style={styles.input} onChangeText={onChange} value={password} secureTextEntry={true} />
          )}
          name='password'
        />
        {errors.password && (
          <CustomText value={messagesApp.PASSWORD_REQUIRED} type={'error'}>
            {' '}
          </CustomText>
        )}
        <Button title='Iniciar' onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  )
}
/*
const Login = (props) => {
  const [username, onChangeUsername] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const validation = () => {
    if (password.length < 8) {
      console.log("password is required");
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(username)) {
      console.log("email not valid");
    }

    props.handleChange({ username, password });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri:
              "https://images-traestodo.s3.amazonaws.com/Logo_NowExpressCourier.jpg",
          }}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Contraseña"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.Button}>
        <Button title="Iniciar" onPress={validation} />
      </View>
    </SafeAreaView>
  );
};
*/
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    width: '100%',
    paddingLeft: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  container: {
    width: 290,
  },
  Button: {
    //width: "100%",
    //textAlign: "center",
  },
  tinyLogo: {
    width: 290,
    height: 50,
    position: 'relative',
    margin: 'auto',
    bottom: 20,
  },
  textColor: {
    color: 'white',
  },
})
