import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding1() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/onboarding1.png')} style={styles.image} />
      <Text style={styles.title}>Bem-vindo ao Track In</Text>
      <Text style={styles.subtitle}>Gerencie suas motos com praticidade e agilidade!</Text>
      <Button title="Continuar" onPress={() => navigation.navigate('Onboarding2' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
});
