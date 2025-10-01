import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import { CreateMotoDTO } from '../models/Moto';
import { motoService } from '../services/motoService';
import patioService, { Patio } from '../services/patioService';
import { RootStackParamList } from '../models/RootStackParamList';
import { useTheme } from '../context/ThemeContext';
import { colors, gradients } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing, borderRadius } from '../styles/spacing';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const modelosDisponiveis = [
  { label: 'Mottu Sport 110i', value: 'Mottu Sport 110i' },
  { label: 'Mottu E', value: 'Mottu E' },
  { label: 'Mottu POP 110i', value: 'Mottu POP 110i' },
];

const modeloMap: Record<string, number> = {
  'Mottu Sport 110i': 0,
  'Mottu E': 1,
  'Mottu POP 110i': 2,
};

const statusDisponiveis = [
  { label: 'Disponível', value: 'DISPONIVEL' },
  { label: 'Alugada', value: 'ALUGADA' },
  { label: 'Em manutenção', value: 'EM_MANUTENCAO' },
];

const schema = z.object({
  patioId: z.number().min(1, 'Selecione um Pátio'),
  modelo: z.string().min(1, 'Modelo é obrigatório'),
  status: z.string().min(1, 'Status é obrigatório'),
  placa: z.string().min(1, 'Placa é obrigatória'),
  ano: z.number().min(2010, 'Ano mínimo 2010').max(2026, 'Ano máximo 2026'),
  rfidTag: z.string().min(1, 'RFID é obrigatório'),
});

type FormData = z.infer<typeof schema>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MotoForm'>;

export default function CadastroScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<any>();
  const motoParaEditar = route.params?.moto;
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [patios, setPatios] = useState<Patio[]>([]);
  const [loadingPatios, setLoadingPatios] = useState(true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      patioId: motoParaEditar?.patioId ?? 0,
      modelo: motoParaEditar?.modelo ?? modelosDisponiveis[0].value,
      status: motoParaEditar?.status ?? 'DISPONIVEL',
      placa: motoParaEditar?.placa ?? '',
      ano: motoParaEditar?.ano ?? new Date().getFullYear(),
      rfidTag: motoParaEditar?.rfidTag ?? '',
    },
  });

  useEffect(() => {
    const fetchPatios = async () => {
      try {
        const data = await patioService.getPatios();
        setPatios(data);
      } catch (err) {
        console.error('❌ Erro ao carregar pátios:', err);
        Alert.alert('Erro', 'Falha ao carregar lista de pátios.');
      } finally {
        setLoadingPatios(false);
      }
    };
    fetchPatios();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload: CreateMotoDTO = {
        patioId: data.patioId,
        placa: data.placa,
        modelo: data.modelo,
        status: data.status,
        ano: data.ano,
        rfidTag: data.rfidTag,
      };

      const novaMoto = await motoService.createMoto(payload);

      Alert.alert('✅ Sucesso', 'Moto cadastrada com sucesso!');

      reset();
      navigation.navigate('Status', { novaMoto });
    } catch (err: any) {
      console.error('❌ Erro ao cadastrar moto:', err.response?.data || err.message);
      Alert.alert('Erro', 'Falha ao cadastrar moto. Verifique os dados ou a conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      backgroundColor: theme === 'dark' ? colors.dark.background : colors.light.background,
    },
    title: {
      color: theme === 'dark' ? colors.dark.text : colors.light.text,
    },
    pickerContainer: {
      backgroundColor: theme === 'dark' ? colors.dark.surface : colors.light.background,
      borderColor: theme === 'dark' ? colors.gray[600] : colors.gray[300],
    },
  });

  return (
    <ScrollView style={[styles.container, dynamicStyles.container]}>
      <LinearGradient
        colors={theme === 'dark' ? gradients.dark : gradients.primary}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>
          {motoParaEditar ? 'Editar Moto' : 'Nova Moto'}
        </Text>
        <Text style={styles.headerSubtitle}>
          {motoParaEditar
            ? 'Atualize os dados da moto'
            : 'Cadastre uma nova moto no sistema'}
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <Card>
          <Text style={[styles.label, dynamicStyles.title]}>Pátio</Text>
          {loadingPatios ? (
            <ActivityIndicator size="small" color={colors.primary[500]} />
          ) : (
            <Controller
              control={control}
              name="patioId"
              render={({ field: { value, onChange } }) => (
                <View style={[styles.pickerContainer, dynamicStyles.pickerContainer]}>
                  <Picker selectedValue={value} onValueChange={(val) => onChange(Number(val))}>
                    <Picker.Item label="Selecione um pátio" value={0} />
                    {patios.map((p) => (
                      <Picker.Item key={p.id} label={p.nome} value={p.id} />
                    ))}
                  </Picker>
                </View>
              )}
            />
          )}
          {errors.patioId && <Text style={styles.error}>{errors.patioId.message}</Text>}

          <Text style={[styles.label, dynamicStyles.title]}>Modelo</Text>
          <Controller
            control={control}
            name="modelo"
            render={({ field: { value, onChange } }) => (
              <View style={[styles.pickerContainer, dynamicStyles.pickerContainer]}>
                <Picker selectedValue={value} onValueChange={onChange}>
                  {modelosDisponiveis.map((m) => (
                    <Picker.Item key={m.value} label={m.label} value={m.value} />
                  ))}
                </Picker>
              </View>
            )}
          />
          {errors.modelo && <Text style={styles.error}>{errors.modelo.message}</Text>}

          <Text style={[styles.label, dynamicStyles.title]}>Status</Text>
          <Controller
            control={control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <View style={[styles.pickerContainer, dynamicStyles.pickerContainer]}>
                <Picker selectedValue={value} onValueChange={onChange}>
                  {statusDisponiveis.map((s) => (
                    <Picker.Item key={s.value} label={s.label} value={s.value} />
                  ))}
                </Picker>
              </View>
            )}
          />
          {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}

          <Controller
            control={control}
            name="placa"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Placa"
                placeholder="Ex: ABC-1234"
                value={value}
                onChangeText={onChange}
                error={errors.placa?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="ano"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Ano"
                placeholder="Ex: 2023"
                keyboardType="numeric"
                value={value.toString()}
                onChangeText={(text) => onChange(Number(text))}
                error={errors.ano?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="rfidTag"
            render={({ field: { value, onChange } }) => (
              <Input
                label="RFID Tag"
                placeholder="Ex: RFID-001"
                value={value}
                onChangeText={onChange}
                error={errors.rfidTag?.message}
              />
            )}
          />
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            title={motoParaEditar ? 'Atualizar Moto' : 'Cadastrar Moto'}
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            size="lg"
          />
        </View>
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
  content: { padding: spacing[6], marginTop: -spacing[4] },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    marginBottom: spacing[2],
    marginTop: spacing[4],
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    marginBottom: spacing[4],
    overflow: 'hidden',
  },
  error: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginTop: -spacing[3],
    marginBottom: spacing[4],
  },
  buttonContainer: { marginTop: spacing[6] },
});
