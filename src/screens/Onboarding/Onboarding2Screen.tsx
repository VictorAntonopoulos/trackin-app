import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding2() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/onboarding2.png')} style={styles.image} />
      <Text style={styles.title}>Visualize o status de cada moto</Text>
      <Text style={styles.subtitle}>Verifique quais estão disponíveis, retiradas ou em manutenção.</Text>
      <Button title="Continuar" onPress={() => navigation.navigate('Onboarding3' as never)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
});
