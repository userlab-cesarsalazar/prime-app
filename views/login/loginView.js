import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Image,
} from "react-native";

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

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    width: "100%",
    paddingLeft: 10,
    borderRadius: 4,
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
    position: "relative",
    margin: "auto",
    bottom: 20,
  },
});

export default Login;
