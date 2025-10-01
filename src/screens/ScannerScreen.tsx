import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { motoService } from '../services/motoService';
import { Moto, Localizacao } from '../models/Moto'; 
import { useTheme } from '../context/ThemeContext';
import { colors, gradients } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// Mapas para traduzir modelo e status
const modeloMap: Record<number, string> = {
  0: 'Mottu Sport 110i',
  1: 'Mottu E',
  2: 'Mottu POP 110i',
};

const statusMap: Record<string, { label: string; color: string }> = {
  DISPONIVEL: { label: 'Disponível', color: colors.success },
  ALUGADA: { label: 'Alugada', color: colors.error },
  EM_MANUTENCAO: { label: 'Em manutenção', color: colors.warning },
};

export default function ScannerScreen() {
  const [carregando, setCarregando] = useState(false);
  const [motoSelecionada, setMotoSelecionada] = useState<Moto | null>(null);
  const { theme } = useTheme();

  const gerarLocalizacaoSimulada = (): Localizacao => {
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

    try {
      const lista = await motoService.getAllMotos();

      if (lista.length === 0) {
        Alert.alert('Sem motos', 'Cadastre uma moto antes de escanear.');
        setCarregando(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      const index = Math.floor(Math.random() * lista.length);
      const moto = lista[index];
      const novaLocalizacaoSimulada = gerarLocalizacaoSimulada();

      const motoParaAtualizar: Moto = { ...moto };
      motoParaAtualizar.rfidTag = `RFID-${novaLocalizacaoSimulada.setor}`;
      motoParaAtualizar.localizacao = novaLocalizacaoSimulada; 

      if (motoParaAtualizar.id) {
        await motoService.updateMoto(motoParaAtualizar.id, motoParaAtualizar);
        Alert.alert('Sucesso', `Moto ${moto.placa} atualizada com nova localização!`);
      } else {
        Alert.alert('Erro', 'ID da moto não encontrado para atualização.');
      }

      setMotoSelecionada(motoParaAtualizar);
    } catch (error) {
      console.error('❌ Erro ao simular scanner:', error);
      Alert.alert('Erro', 'Falha ao simular leitura RFID. Verifique a conexão com a API.');
    } finally {
      setCarregando(false);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'dark' ? colors.dark.background : colors.light.background,
    },
    instructionText: {
      color: theme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    motoTitle: {
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
    },
    motoSubtitle: {
      color: theme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    },
  });

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <LinearGradient
        colors={theme === 'dark' ? gradients.dark : gradients.primary}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Scanner RFID</Text>
        <Text style={styles.headerSubtitle}>
          Simule a leitura de tags RFID das motos
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <Card style={styles.scannerCard}>
          <View style={styles.scannerArea}>
            <LinearGradient
              colors={carregando ? [colors.primary[200], colors.primary[400]] : [colors.gray[100], colors.gray[200]]}
              style={styles.scannerCircle}
            >
              <Text style={styles.scannerIcon}>
                {carregando ? '📡' : '🔍'}
              </Text>
            </LinearGradient>
            
            <Text style={[styles.scannerTitle, dynamicStyles.motoTitle]}>
              {carregando ? 'Escaneando...' : 'Pronto para escanear'}
            </Text>
            
            <Text style={[styles.scannerSubtitle, dynamicStyles.instructionText]}>
              {carregando 
                ? 'Aguarde enquanto processamos a leitura RFID'
                : 'Toque no botão abaixo para simular uma leitura RFID'
              }
            </Text>
          </View>

          <Button
            title={carregando ? 'Escaneando...' : 'Simular Leitura RFID'}
            onPress={simularScanner}
            loading={carregando}
            size="lg"
            style={styles.scanButton}
          />
        </Card>

        {motoSelecionada && (
          <Card style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultEmoji}>✅</Text>
              <Text style={[styles.resultTitle, dynamicStyles.motoTitle]}>
                Moto Detectada
              </Text>
            </View>

            {motoSelecionada.imagemReferencia ? (
              <Image
                source={{ uri: motoSelecionada.imagemReferencia }}
                style={styles.motoImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>🏍️</Text>
              </View>
            )}

            <View style={styles.motoDetails}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, dynamicStyles.motoSubtitle]}>Modelo:</Text>
                <Text style={[styles.detailValue, dynamicStyles.motoTitle]}>
                  {modeloMap[Number(motoSelecionada.modelo)] ?? `Modelo ${motoSelecionada.modelo}`}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, dynamicStyles.motoSubtitle]}>Placa:</Text>
                <Text style={[styles.detailValue, dynamicStyles.motoTitle]}>
                  {motoSelecionada.placa}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, dynamicStyles.motoSubtitle]}>Status:</Text>
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: statusMap[motoSelecionada.status]?.color || colors.gray[400] },
                    ]}
                  />
                  <Text style={[styles.detailValue, dynamicStyles.motoTitle]}>
                    {statusMap[motoSelecionada.status]?.label ?? motoSelecionada.status}
                  </Text>
                </View>
              </View>

              {motoSelecionada.localizacao && (
                <>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, dynamicStyles.motoSubtitle]}>Setor:</Text>
                    <Text style={[styles.detailValue, dynamicStyles.motoTitle]}>
                      {motoSelecionada.localizacao.setor}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, dynamicStyles.motoSubtitle]}>Coordenadas:</Text>
                    <Text style={[styles.detailValue, dynamicStyles.motoTitle]}>
                      {motoSelecionada.localizacao.coordenadas.lat}, {motoSelecionada.localizacao.coordenadas.lon}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: spacing[16],
    paddingBottom: spacing[8],
    paddingHorizontal: spacing[6],
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.light.background,
    marginBottom: spacing[2],
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.light.background,
    opacity: 0.9,
    textAlign: 'center',
  },
  content: {
    padding: spacing[6],
    marginTop: -spacing[4],
  },
  scannerCard: {
    alignItems: 'center',
    padding: spacing[8],
    marginBottom: spacing[6],
  },
  scannerArea: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  scannerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
  },
  scannerIcon: { fontSize: 48 },
  scannerTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semibold,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  scannerSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  scanButton: { minWidth: 200 },
  resultCard: { padding: spacing[6] },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  resultEmoji: { fontSize: 24, marginRight: spacing[3] },
  resultTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semibold,
  },
  motoImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: spacing[6],
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
  },
  placeholderText: { fontSize: 64 },
  motoDetails: { gap: spacing[4] },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    flex: 1,
  },
  detailValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    flex: 2,
    textAlign: 'right',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing[2],
  },
});
