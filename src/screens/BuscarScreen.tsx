import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { motoService } from '../services/motoService';
import { Moto } from '../models/Moto';
import { useTheme } from '../context/ThemeContext';
import { colors, gradients } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function BuscarScreen() {
  const [motos, setMotos] = useState<Moto[]>([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const { theme } = useTheme();

  
  const modeloMap: Record<number, string> = {
    0: 'Mottu Sport 110i',
    1: 'Mottu E',
    2: 'Mottu POP 110i',
  };

  const fetchMotos = useCallback(async () => {
    setLoading(true);
    try {
      const lista = await motoService.getAllMotos();
      setMotos(lista);
    } catch (error) {
      console.error('Erro ao carregar motos:', error);
      Alert.alert('Erro', 'Não foi possível carregar as motos da API.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMotos();
    }, [fetchMotos])
  );

  const editarMoto = (moto: Moto) => {
    navigation.navigate('MotoForm', { moto });
  };

  const excluirMoto = async (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja mesmo excluir esta moto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await motoService.deleteMoto(id);
            Alert.alert('Sucesso', 'Moto excluída com sucesso!');
            fetchMotos();
          } catch (error) {
            console.error('Erro ao excluir moto:', error);
            Alert.alert('Erro', 'Não foi possível excluir a moto da API.');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  
  const filtradas = motos.filter((m) =>
    (modeloMap[Number(m.modelo)] ?? '').toLowerCase().includes(busca.toLowerCase())
  );

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'dark' ? colors.dark.background : colors.light.background,
    },
    emptyText: {
      color: theme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    },
    motoTitle: {
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
    },
    motoSubtitle: {
      color: theme === 'dark' ? colors.dark.textSecondary : colors.light.textSecondary,
    },
  });

  const renderMotoCard = ({ item }: { item: Moto }) => (
    <Card style={styles.motoCard}>
      <View style={styles.motoContent}>
        {item.imagemReferencia ? (
          <Image source={{ uri: item.imagemReferencia }} style={styles.motoImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🏍️</Text>
          </View>
        )}

        <View style={styles.motoInfo}>
          <Text style={[styles.motoModel, dynamicStyles.motoTitle]}>
            {modeloMap[Number(item.modelo)] ?? item.modelo}
          </Text>
          <Text style={[styles.motoPlate, dynamicStyles.motoSubtitle]}>
            {item.placa}
          </Text>

          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                item.status === 'Disponível' && { backgroundColor: colors.success },
                item.status === 'Retirada' && { backgroundColor: colors.error },
                item.status === 'Em manutenção' && { backgroundColor: colors.warning },
              ]}
            />
            <Text style={[styles.statusText, dynamicStyles.motoSubtitle]}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <Button
          title="Editar"
          variant="outline"
          size="sm"
          onPress={() => editarMoto(item)}
          style={styles.actionButton}
        />
        <Button
          title="Excluir"
          variant="secondary"
          size="sm"
          onPress={() => excluirMoto(item.id)}
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer, dynamicStyles.container]}>
        <LinearGradient
          colors={theme === 'dark' ? gradients.dark : gradients.primary}
          style={styles.loadingGradient}
        >
          <Text style={styles.loadingText}>Carregando motos...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      {/* Header com gradiente */}
      <LinearGradient
        colors={theme === 'dark' ? gradients.dark : gradients.primary}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Buscar Motos</Text>
        <Text style={styles.headerSubtitle}>Encontre e gerencie suas motos</Text>
      </LinearGradient>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Input
          placeholder="Buscar por modelo..."
          value={busca}
          onChangeText={setBusca}
          containerStyle={styles.searchContainer}
        />

        {filtradas.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={[styles.emptyTitle, dynamicStyles.motoTitle]}>
              Nenhuma moto encontrada
            </Text>
            <Text style={[styles.emptySubtitle, dynamicStyles.emptyText]}>
              Tente ajustar os filtros de busca ou cadastre uma nova moto
            </Text>
          </Card>
        ) : (
          <FlatList
            data={filtradas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMotoCard}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { justifyContent: 'center', alignItems: 'center' },
  loadingGradient: { padding: spacing[8], borderRadius: 20, alignItems: 'center' },
  loadingText: { color: colors.light.background, fontSize: typography.fontSize.lg, fontFamily: typography.fontFamily.medium },
  header: { paddingTop: spacing[16], paddingBottom: spacing[8], paddingHorizontal: spacing[6], alignItems: 'center' },
  headerTitle: { fontSize: typography.fontSize['2xl'], fontFamily: typography.fontFamily.bold, color: colors.light.background, marginBottom: spacing[2] },
  headerSubtitle: { fontSize: typography.fontSize.base, fontFamily: typography.fontFamily.regular, color: colors.light.background, opacity: 0.9 },
  content: { padding: spacing[6], marginTop: -spacing[4] },
  searchContainer: { marginBottom: spacing[6] },
  motoCard: { marginBottom: spacing[4], padding: spacing[4] },
  motoContent: { flexDirection: 'row', marginBottom: spacing[4] },
  motoImage: { width: 80, height: 80, borderRadius: 12, marginRight: spacing[4] },
  placeholderImage: { width: 80, height: 80, borderRadius: 12, backgroundColor: colors.gray[100], alignItems: 'center', justifyContent: 'center', marginRight: spacing[4] },
  placeholderText: { fontSize: 32 },
  motoInfo: { flex: 1, justifyContent: 'space-between' },
  motoModel: { fontSize: typography.fontSize.lg, fontFamily: typography.fontFamily.semibold, marginBottom: spacing[1] },
  motoPlate: { fontSize: typography.fontSize.base, fontFamily: typography.fontFamily.regular, marginBottom: spacing[2] },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: spacing[2] },
  statusText: { fontSize: typography.fontSize.sm, fontFamily: typography.fontFamily.medium },
  actionButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  actionButton: { marginLeft: spacing[2], minWidth: 80 },
  emptyCard: { alignItems: 'center', padding: spacing[8] },
  emptyEmoji: { fontSize: 48, marginBottom: spacing[4] },
  emptyTitle: { fontSize: typography.fontSize.lg, fontFamily: typography.fontFamily.semibold, textAlign: 'center', marginBottom: spacing[2] },
  emptySubtitle: { fontSize: typography.fontSize.base, fontFamily: typography.fontFamily.regular, textAlign: 'center', lineHeight: typography.lineHeight.relaxed * typography.fontSize.base },
});
