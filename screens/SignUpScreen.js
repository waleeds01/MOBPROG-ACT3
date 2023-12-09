import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { colorBackgroundTheme } from '../theme';

// Import your background image
import BackgroundImage from '../assets/images/hinata.png';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (name && email && password) {
      try {
        const response = await fetch('http://192.168.1.63:8000/api/auth/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });

        const result = await response.json();
        console.log('Success:', result);

        if (response.status === 200) {
          await navigation.navigate('Login');
          console.log('Success');
          setName('');
          setEmail('');
          setPassword('');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        Alert.alert('Error', 'An error occurred during signup');
      }
    }
  };

  return (
    <ImageBackground
      source={BackgroundImage}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
              <ArrowLeftIcon size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={require('../assets/images/woa.png')} style={{ width: 250, height: 150 }} />
          </View>

          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(value) => setName(value)}
                placeholder="Enter Name"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholder="Enter Email"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={(value) => setPassword(value)}
                placeholder="Enter Password"
              />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.LoginingText, { color: 'red' }]}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = {
  container: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add background color with some transparency
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: 'black',
    marginLeft: 10,
  },
  input: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 20,
    marginBottom: 10,
    color: 'white',
  },
  button: {
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 7,
  },
  linkText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  LoginingText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16
  },
};
