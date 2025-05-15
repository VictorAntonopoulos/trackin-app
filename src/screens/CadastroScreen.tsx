import 'react-native-get-random-values';
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { Moto } from '../models/Moto';
import { saveMotos, loadMotos } from '../storage/MotoStorage';
import { RootStackParamList } from '../models/RootStackParamList';

const modelos = [
  { label: 'Mottu Sport 110i', value: 'Mottu Sport 110i', imagemUrl: 'https://mottu.com.br/wp-content/uploads/2023/09/sport-2.webp' },
  { label: 'Mottu POP 110i', value: 'Mottu POP 110i', imagemUrl: 'https://mottu.com.br/wp-content/uploads/2023/09/pop.webp' },
];

const schema = z.object({
  modelo: z.enum(['Mottu Sport 110i', 'Mottu POP 110i']),
  status: z.enum(['Disponível', 'Retirada', 'Em manutenção']),
  placa: z.string().min(1, 'Placa é obrigatória'),
});

type FormData = z.infer<typeof schema>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MotoForm'>;

export default function CadastroScreen() {
  const route = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<any>();
  const motoParaEditar = route.params?.moto;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      modelo:
        motoParaEditar?.modelo === 'Mottu Sport 110i' || motoParaEditar?.modelo === 'Mottu POP 110i'
          ? motoParaEditar.modelo
          : 'Mottu Sport 110i',
      status: motoParaEditar?.status ?? 'Disponível',
      placa: motoParaEditar?.placa ?? '',
    },
  });

  const modeloSelecionado = watch('modelo');
  const imagemUrl =
    modelos.find((m) => m.value === modeloSelecionado)?.imagemUrl ?? '';

  const onSubmit = async (data: FormData) => {
    try {
      const listaAtual = await loadMotos();
      let novaLista: Moto[];

      const motoAtualizadaOuNova: Moto = {
        id: motoParaEditar?.id ?? uuidv4(),
        ...data,
        imagemUrl,
        localizacao: motoParaEditar?.localizacao ?? undefined,
      };

      if (motoParaEditar) {
        novaLista = listaAtual.map((m) =>
          m.id === motoParaEditar.id ? motoAtualizadaOuNova : m
        );
        Alert.alert('Sucesso', 'Moto atualizada com sucesso!');
      } else {
        novaLista = [...listaAtual, motoAtualizadaOuNova];
        Alert.alert('Sucesso', 'Moto cadastrada com sucesso!');
      }

      await saveMotos(novaLista);
      reset();
      navigation.navigate('App', { screen: 'Buscar' });
    } catch (err) {
      console.error('❌ Erro ao cadastrar moto:', err);
      Alert.alert('Erro', 'Falha ao salvar moto.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modelo</Text>
      <Controller
        control={control}
        name="modelo"
        render={({ field: { value, onChange } }) => (
          <View style={styles.pickerContainer}>
            <Picker selectedValue={value} onValueChange={onChange}>
              {modelos.map((m) => (
                <Picker.Item key={m.value} label={m.label} value={m.value} />
              ))}
            </Picker>
          </View>
        )}
      />
      {errors.modelo && <Text style={styles.error}>{errors.modelo.message}</Text>}

      <Text style={styles.label}>Status</Text>
      <Controller
        control={control}
        name="status"
        render={({ field: { value, onChange } }) => (
          <View style={styles.pickerContainer}>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Disponível" value="Disponível" />
              <Picker.Item label="Retirada" value="Retirada" />
              <Picker.Item label="Em manutenção" value="Em manutenção" />
            </Picker>
          </View>
        )}
      />
      {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}

      <Text style={styles.label}>Placa</Text>
      <Controller
        control={control}
        name="placa"
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            placeholder="Ex: ABC-1234"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.placa && <Text style={styles.error}>{errors.placa.message}</Text>}

      <Button
        title={motoParaEditar ? 'Salvar Alterações' : 'Cadastrar'}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
  },
  error: { color: 'red', marginBottom: 10 },
});
