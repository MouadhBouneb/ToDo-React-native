// SignInScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from '../slices/authSlice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state)
  console.log("toekn", token.auth.token)
  const handleSignIn = async () => {
    // Implement your authentication logic here
    // Example: Make an API call to authenticate the user

    try {
      console.log("sdjfosdj")
      console.log(password)
      console.log(email)
      const response = await axios.post("http://192.168.133.117:8000/api/login", { password: password, email: email });
      console.log("response", response.data);
      await AsyncStorage.clear()
      await AsyncStorage.setItem("token",response.data.token)
      dispatch(authReducer(response.data.token))
      
      navigation.navigate('Home'); // Replace 'Home' with the actual name of your main app screen
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Handle authentication failure here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  signUpText: {
    marginTop: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
