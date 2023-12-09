import React from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorBackgroundTheme } from '../theme';
import Button from '../Buttons/Button'; // Import the Button component
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const onPressSignOut = () => {
    // Navigate to the Login screen
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorBackgroundTheme.bg }}>
      <ImageBackground source={require('../assets/images/op.png')} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/images/zoro.png')} style={styles.logoImage} />
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/zoro0.png')} style={styles.welcomeImage} />
          </View>
          <Button text="Sign Out" type="TERTIARY" onPress={onPressSignOut} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 100,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeImage: {
    width: 300,
    height: 300,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
