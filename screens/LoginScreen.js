import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { colorBackgroundTheme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const response = await fetch('http://192.168.1.63:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password }),
        });

        const result = await response.json();
        console.log('Success:', result);

        if (response.status === 200) {
          await navigation.navigate('Home');
          console.log('Success');
          setEmail('');
          setPassword('');
        }
      } catch (error) {
        console.error('Error during login:', error);
        Alert.alert('Error', 'An error occurred during login');
      }
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/boa.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
              <ArrowLeftIcon size={30} color="white" font="bold" />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 1 }}>
            {/* You can remove the Image component as it's now the background */}
          </View>

          <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, flex: 1, backgroundColor: 'transparent', paddingHorizontal: 20, paddingTop: 20 }}>
            <View style={{ marginBottom: 20, marginTop: 25 }}>
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  placeholder="Enter Password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Text style={styles.secondaryText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.SigningupText}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = {
  label: {
    color: 'gray',
    marginLeft: 10,
  },
  inputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  input: {
    padding: 10,
    color: 'white',
  },
  button: {
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  secondaryText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  SigningupText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
};
