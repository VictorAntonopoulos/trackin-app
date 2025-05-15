import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { loadMotos } from '../storage/MotoStorage';
import { Moto } from '../models/Moto';

export default function StatusScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        const lista = await loadMotos();
        setMotos(lista);
      };
      fetch();
    }, [])
  );

  const statusAgrupados: { title: Moto['status']; data: Moto[] }[] = [
    { title: 'Disponível', data: motos.filter((m) => m.status === 'Disponível') },
    { title: 'Retirada', data: motos.filter((m) => m.status === 'Retirada') },
    { title: 'Em manutenção', data: motos.filter((m) => m.status === 'Em manutenção') },
  ];

  return (
    <FlatList
      data={statusAgrupados}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <View style={styles.grupoContainer}>
          <Text style={styles.statusTitulo}>{item.title}</Text>
          {item.data.length === 0 ? (
            <Text style={styles.vazio}>Nenhuma moto</Text>
          ) : (
            item.data.map((moto) => {
              const setor = moto.localizacao?.setor ?? 'N/A';
              const latitude = moto.localizacao?.coordenadas?.lat ?? 'N/A';
              const longitude = moto.localizacao?.coordenadas?.lon ?? 'N/A';

              return (
                <View style={styles.card} key={moto.id}>
                  <View style={styles.linhaStatus}>
                    <View
                      style={[
                        styles.statusBola,
                        moto.status === 'Disponível' && { backgroundColor: 'green' },
                        moto.status === 'Retirada' && { backgroundColor: 'red' },
                        moto.status === 'Em manutenção' && { backgroundColor: 'gold' },
                      ]}
                    />
                    <Text style={styles.modelo}>{moto.modelo}</Text>
                  </View>
                  <Text style={styles.label}>Placa: {moto.placa}</Text>
                  <Text style={styles.label}>Localização: {setor}</Text>
                  <Text style={styles.label}>Coordenadas: {latitude}, {longitude}</Text>
                </View>
              );
            })
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  grupoContainer: { padding: 20 },
  statusTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 4,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  linhaStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusBola: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  modelo: { fontSize: 16, fontWeight: 'bold' },
  label: { fontSize: 14, color: '#444' },
  vazio: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 10,
  },
});
