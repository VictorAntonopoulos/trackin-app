import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Button,
  Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { loadMotos, saveMotos } from '../storage/MotoStorage';
import { Moto } from '../models/Moto';

export default function BuscarScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [busca, setBusca] = useState('');
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        const lista = await loadMotos();
        setMotos(lista);
      };
      fetch();
    }, [])
  );

  const editarMoto = (moto: Moto) => {
    navigation.navigate('MotoForm', { moto });
  };

  const excluirMoto = async (id: string) => {
    Alert.alert('Confirmar exclusão', 'Deseja mesmo excluir esta moto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const novaLista = motos.filter((m) => m.id !== id);
          await saveMotos(novaLista);
          setMotos(novaLista);
        },
      },
    ]);
  };

  const filtradas = motos.filter((m) =>
    m.modelo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por modelo..."
        value={busca}
        onChangeText={setBusca}
      />
      <FlatList
        data={filtradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagemUrl ? (
              <Image source={{ uri: item.imagemUrl }} style={styles.imagem} />
            ) : (
              <Text style={styles.semImagem}>Sem imagem</Text>
            )}
            <Text style={styles.label}>Modelo: {item.modelo}</Text>
            <Text style={styles.label}>Placa: {item.placa}</Text>
            <Text style={styles.label}>Status: {item.status}</Text>

            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => editarMoto(item)} />
              <View style={{ width: 10 }} />
              <Button
                title="Excluir"
                color="red"
                onPress={() => excluirMoto(item.id)}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhuma moto encontrada</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  imagem: {
    width: '100%',
    height: 260,
    borderRadius: 6,
    marginBottom: 10,
  },
  label: { fontSize: 16 },
  botoes: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  vazio: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    color: '#777',
  },
  semImagem: {
    fontStyle: 'italic',
    color: '#999',
    marginBottom: 10,
  },
});
