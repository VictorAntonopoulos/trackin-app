import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import patioService, { CreatePatioDTO } from '../services/patioService';
import { useTheme } from '../context/ThemeContext';
import { colors, gradients } from '../styles/colors';
import { typography } from '../styles/typography';
import { spacing } from '../styles/spacing';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(1, 'Estado é obrigatório'),
  pais: z.string().min(1, 'País é obrigatório'),
  dimensaoX: z.coerce.number().min(1, 'Dimensão X inválida'),
  dimensaoY: z.coerce.number().min(1, 'Dimensão Y inválida'),
  plantaBaixa: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function CadastroPatioScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: '',
      endereco: '',
      cidade: '',
      estado: '',
      pais: '',
      dimensaoX: 100,
      dimensaoY: 100,
      plantaBaixa: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const payload: CreatePatioDTO = {
        ...data,
        dimensaoX: Number(data.dimensaoX),
        dimensaoY: Number(data.dimensaoY),
      };

      await patioService.createPatio(payload);
      Alert.alert('✅ Sucesso', 'Pátio cadastrado com sucesso!');
      reset();
      navigation.goBack();
    } catch (err) {
      console.error('❌ Erro ao salvar pátio:', err);
      Alert.alert('Erro', 'Falha ao cadastrar pátio. Verifique os dados ou a conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme === 'dark' ? colors.dark.background : colors.light.background }}>
      <LinearGradient
        colors={theme === 'dark' ? gradients.dark : gradients.primary}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Novo Pátio</Text>
        <Text style={styles.headerSubtitle}>Cadastre um pátio para associar às motos</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Card>
          <Controller
            control={control}
            name="nome"
            render={({ field }) => (
              <Input label="Nome" placeholder="Pátio Central" value={field.value} onChangeText={field.onChange} error={errors.nome?.message} />
            )}
          />
          <Controller
            control={control}
            name="endereco"
            render={({ field }) => (
              <Input label="Endereço" placeholder="Rua Exemplo, 123" value={field.value} onChangeText={field.onChange} error={errors.endereco?.message} />
            )}
          />
          <Controller
            control={control}
            name="cidade"
            render={({ field }) => (
              <Input label="Cidade" placeholder="São Paulo" value={field.value} onChangeText={field.onChange} error={errors.cidade?.message} />
            )}
          />
          <Controller
            control={control}
            name="estado"
            render={({ field }) => (
              <Input label="Estado" placeholder="SP" value={field.value} onChangeText={field.onChange} error={errors.estado?.message} />
            )}
          />
          <Controller
            control={control}
            name="pais"
            render={({ field }) => (
              <Input label="País" placeholder="Brasil" value={field.value} onChangeText={field.onChange} error={errors.pais?.message} />
            )}
          />
          <Controller
            control={control}
            name="dimensaoX"
            render={({ field }) => (
              <Input label="Dimensão X (m)" keyboardType="numeric" value={String(field.value)} onChangeText={(text) => field.onChange(Number(text))} error={errors.dimensaoX?.message} />
            )}
          />
          <Controller
            control={control}
            name="dimensaoY"
            render={({ field }) => (
              <Input label="Dimensão Y (m)" keyboardType="numeric" value={String(field.value)} onChangeText={(text) => field.onChange(Number(text))} error={errors.dimensaoY?.message} />
            )}
          />
          <Controller
            control={control}
            name="plantaBaixa"
            render={({ field }) => (
              <Input label="Planta Baixa (opcional)" placeholder="URL da planta baixa" value={field.value} onChangeText={field.onChange} />
            )}
          />
        </Card>

        <View style={styles.buttonContainer}>
          <Button title="Cadastrar Pátio" onPress={handleSubmit(onSubmit)} loading={loading} size="lg" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  buttonContainer: {
    marginTop: spacing[6],
  },
});
