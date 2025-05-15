import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterStep4() {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const navigation = useNavigation();

  const podeProsseguir = senha.length >= 6 && senha === confirmar;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Defina sua senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
      />

      <Button
        title="Finalizar"
        disabled={!podeProsseguir}
        onPress={() => navigation.navigate('RegisterStep5' as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 12, marginBottom: 20,
  },
});
