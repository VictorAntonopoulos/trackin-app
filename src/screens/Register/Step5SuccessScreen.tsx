import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterStep5() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const handleIrParaLogin = () => {
    navigation.navigate('Login');
  };

  useEffect(() => {
    const salvar = async () => {
      const { nome, email, senha, local } = route.params;
      const novoUsuario = { nome, email, senha, local };

      const dados = await AsyncStorage.getItem('@trackin:usuarios');
      const usuarios = dados ? JSON.parse(dados) : [];

      usuarios.push(novoUsuario);
      await AsyncStorage.setItem('@trackin:usuarios', JSON.stringify(usuarios));
    };

    salvar();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/845/845646.png' }}
        style={styles.imagem}
      />
      <Text style={styles.title}>Cadastro concluído!</Text>
      <Text style={styles.description}>
        Sua conta foi registrada com sucesso. Agora você pode fazer login e usar o Track In.
      </Text>
      <Button title="Ir para o login" onPress={handleIrParaLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
});
