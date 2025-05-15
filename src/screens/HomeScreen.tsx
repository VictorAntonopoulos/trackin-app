import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/trackin-logo.png')} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo ao <Text style={styles.brand}>Track In</Text></Text>
      <Text style={styles.subtitle}>
        Gerencie suas motos com tecnologia de ponta utilizando RFID, visão computacional e monitoramento inteligente.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins_600SemiBold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 10,
  },
  brand: {
    color: '#e60023',
    fontFamily: 'Poppins_600SemiBold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    color: '#555',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
});
