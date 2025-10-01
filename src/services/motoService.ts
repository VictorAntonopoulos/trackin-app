import api from './api';
import { Moto } from '../models/Moto';

export const motoService = {
  async getAllMotos(): Promise<Moto[]> {
    try {
      const response = await api.get<Moto[]>('/Moto/all');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar todas as motos:', error);
      throw error;
    }
  },

  async getMotoById(id: number): Promise<Moto> {
    try {
      const response = await api.get<Moto>(`/Moto/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar moto com ID ${id}:`, error);
      throw error;
    }
  },

  async createMoto(moto: Omit<Moto, 'id'>): Promise<Moto> {
    try {
      const response = await api.post<Moto>('/Moto', moto);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar moto:', error);
      throw error;
    }
  },

  async updateMoto(id: number, moto: Moto): Promise<void> {
    try {
      await api.put(`/Moto/${id}`, moto);
    } catch (error) {
      console.error(`Erro ao atualizar moto com ID ${id}:`, error);
      throw error;
    }
  },

  async deleteMoto(id: number): Promise<void> {
    try {
      await api.delete(`/Moto/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar moto com ID ${id}:`, error);
      throw error;
    }
  },

  
};


