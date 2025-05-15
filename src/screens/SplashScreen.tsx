import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const iniciar = async () => {
      const onboardingConcluido = await AsyncStorage.getItem('@trackin:onboarding');
      setTimeout(() => {
        if (onboardingConcluido === 'true') {
          navigation.navigate('Login' as never);
        } else {
          navigation.navigate('Onboarding1' as never);
        }
      }, 1500);
    };

    iniciar();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.texto}>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  texto: { marginTop: 10, fontSize: 16, color: '#555' },
});
