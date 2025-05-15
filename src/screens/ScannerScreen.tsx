import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { loadMotos, saveMotos } from '../storage/MotoStorage';
import { Moto } from '../models/Moto';

export default function ScannerScreen() {
  const [carregando, setCarregando] = useState(false);
  const [motoSelecionada, setMotoSelecionada] = useState<Moto | null>(null);

  const gerarLocalizacaoSimulada = () => {
    const setores = ['Setor A', 'Setor B', 'Setor C', 'Setor D', 'Setor E', 'Setor Z'];
    const setor = setores[Math.floor(Math.random() * setores.length)];

    const lat = -23.5 + Math.random() * 0.1;
    const lon = -46.6 + Math.random() * 0.1;

    return {
      coordenadas: {
        lat: Number(lat.toFixed(6)),
        lon: Number(lon.toFixed(6)),
      },
      setor,
    };
  };

  const simularScanner = async () => {
    setCarregando(true);
    setMotoSelecionada(null);

    setTimeout(async () => {
      const lista = await loadMotos();

      if (lista.length === 0) {
        Alert.alert('Sem motos', 'Cadastre uma moto antes de escanear.');
        setCarregando(false);
        return;
      }

      const index = Math.floor(Math.random() * lista.length);
      const moto = lista[index];
      const novaLocalizacao = gerarLocalizacaoSimulada();

      const novaMoto: Moto = {
        ...moto,
        localizacao: novaLocalizacao,
      };

      const listaAtualizada = lista.map((m) =>
        m.id === novaMoto.id ? novaMoto : m
      );

      await saveMotos(listaAtualizada);
      setMotoSelecionada(novaMoto);
      setCarregando(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner de Motos (Simulação)</Text>
      <Button title="Simular Leitura RFID" onPress={simularScanner} />

      {carregando && <ActivityIndicator size="large" style={{ marginTop: 30 }} />}

      {motoSelecionada && (
        <View style={styles.card}>
          {motoSelecionada.imagemUrl ? (
            <Image
              source={{ uri: motoSelecionada.imagemUrl }}
              style={styles.imagem}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.semImagem}>Sem imagem</Text>
          )}
          <Text style={styles.info}>Modelo: {motoSelecionada.modelo}</Text>
          <Text style={styles.info}>Placa: {motoSelecionada.placa}</Text>
          <Text style={styles.info}>Status: {motoSelecionada.status}</Text>
          <Text style={styles.info}>Setor: {motoSelecionada.localizacao?.setor}</Text>
          <Text style={styles.info}>
            Coordenadas: {motoSelecionada.localizacao?.coordenadas.lat}, {motoSelecionada.localizacao?.coordenadas.lon}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    elevation: 2,
  },
  imagem: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
  semImagem: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
});
