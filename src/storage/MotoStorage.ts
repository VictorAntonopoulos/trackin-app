import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moto } from '../models/Moto';

const STORAGE_KEY = '@trackin:motos';

export async function saveMotos(motos: Moto[]) {
  try {
    const json = JSON.stringify(motos);
    await AsyncStorage.setItem(STORAGE_KEY, json);
    console.log('✅ [saveMotos] Lista salva:', motos);
  } catch (error) {
    console.error('❌ [saveMotos] Erro ao salvar:', error);
  }
}

export async function loadMotos(): Promise<Moto[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const motos = json ? JSON.parse(json) : [];
    console.log('📥 [loadMotos] Lista carregada:', motos);
    return motos;
  } catch (error) {
    console.error('❌ [loadMotos] Erro ao carregar:', error);
    return [];
  }
}
