import { Moto } from '../models/Moto';
import { motoService } from '../services/motoService';



export async function saveMotos(motos: Moto[]) {
  console.warn('saveMotos: Esta função deve ser substituída por chamadas à API.');
  
}

export async function loadMotos(): Promise<Moto[]> {
  console.warn('loadMotos: Esta função deve ser substituída por chamadas à API.');
  try {
    const motos = await motoService.getAllMotos();
    return motos;
  } catch (error) {
    console.error('Erro ao carregar motos da API:', error);
    return [];
  }
}


