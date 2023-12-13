// components/SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae, Hoshi } from 'react-native-textinput-effects';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Implement your sign-up logic here
    console.log('Signing up:', email, password);
    // Make API request to your authentication server
    // Navigate to the SignIn screen after successful sign-up
    navigation.navigate('SignIn');
  };

  return (
    <View style ={{justifyContent: "center", alignItems :"center" }}>
       <Hoshi
    label={'Email Address'}
    iconClass={FontAwesomeIcon}
    iconName={{}}
    iconColor={'white'}
    style={{ backgroundColor: 'rgba(36,36,36,0.05)'}}
    inputStyle={{ color: "rgba(0,0,0)" }}
    inputPadding={16}
    labelHeight={24}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    value = {email}
    autoCorrect={false}
  />
   <Hoshi
    label={'Name'}
    iconClass={FontAwesomeIcon}
    iconName={{}}
    iconColor={'white'}
    style={{ backgroundColor: 'rgba(36,36,36,0.05)',marginVertical: 20, padding : 8 }}
    inputStyle={{ color: "rgba(0,0,0)" }}
    inputPadding={16}
    labelHeight={24}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
  />
   <Hoshi
    label={'Password'}
    iconClass={FontAwesomeIcon}
    iconName={{}}
    iconColor={'white'}
    style={{ backgroundColor: 'rgba(36,36,36,0.05)' }}
    inputStyle={{ color: "rgba(0,0,0)" }}
    inputPadding={16}
    labelHeight={24}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    onChangeText={(text) => setPassword(text)}
    input
    autoCorrect={false}
    value={password}
  />

      <Button title="Sign Up" onPress={handleSignUp} />
      
    </View>
  );
};

export default SignUpScreen;
