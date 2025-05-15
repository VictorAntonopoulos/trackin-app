import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Onboarding3() {
  const navigation = useNavigation();

  const finalizar = async () => {
    await AsyncStorage.setItem('@trackin:onboarding', 'true');
    navigation.navigate('Login' as never);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/onboarding3.png')} style={styles.image} />
      <Text style={styles.title}>Pronto para começar?</Text>
      <Text style={styles.subtitle}>Cadastre, edite e acompanhe tudo direto no Track In.</Text>
      <Button title="Começar agora" onPress={finalizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  image: { width: '100%', height: 300, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 20 },
  subtitle: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
});
