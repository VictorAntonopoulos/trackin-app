import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUser } from '../storage/AuthStorage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    try {
      const dados = await AsyncStorage.getItem('@trackin:usuarios');
      const usuarios = dados ? JSON.parse(dados) : [];

      const usuarioEncontrado = usuarios.find(
        (u: any) => u.email === email && u.senha === senha
      );

      if (usuarioEncontrado) {
        await saveUser(usuarioEncontrado); // salva o objeto completo
        navigation.replace('App');
      } else {
        Alert.alert('Erro', 'E-mail ou senha inválidos');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível verificar o login');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Image source={require('../../assets/trackin-logo.png')} style={styles.logo} />

      <Text style={styles.title}>Bem-vindo ao Track In</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RegisterStep1')}>
        <Text style={styles.link}>Criar nova conta</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  button: {
    backgroundColor: '#007BFF',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#007BFF',
    marginTop: 10,
    fontSize: 14,
  },
});
