import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    Alert.alert('Sair', 'Deseja realmente sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('@trackin:user');
          navigation.replace('Login');
        },
      },
    ]);
  };

  const verOnboardingNovamente = async () => {
    try {
      await AsyncStorage.removeItem('@trackin:onboarding');
      Alert.alert('Feito!', 'O onboarding será exibido novamente.');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } catch (error) {
      console.error('Erro ao redefinir onboarding:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png' }}
        style={styles.avatar}
      />
      <Text style={styles.nome}>Administrador</Text>
      <Text style={styles.email}>admin@trackin.com</Text>

      <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
        <Text style={styles.botaoTexto}>Sair do aplicativo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoOnboarding} onPress={verOnboardingNovamente}>
        <Text style={styles.textoOnboarding}>🔄 Ver onboarding novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  botaoSair: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoOnboarding: {
    marginTop: 20,
    backgroundColor: '#007bff20',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoOnboarding: {
    color: '#007bff',
    fontSize: 15,
    fontWeight: '600',
  },
});
