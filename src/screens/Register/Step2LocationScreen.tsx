import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterStep2() {
  const [local, setLocal] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onde você está?</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua localização"
        value={local}
        onChangeText={setLocal}
      />

      <Button
        title="Próximo"
        onPress={() => navigation.navigate('RegisterStep3' as never)}
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
