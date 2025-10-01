import api from './api';

export interface Patio {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  dimensaoX?: number;
  dimensaoY?: number;
  plantaBaixa?: string;
}

export interface CreatePatioDTO {
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  pais: string;
  dimensaoX?: number;
  dimensaoY?: number;
  plantaBaixa?: string;
}

const patioService = {
  async getPatios(): Promise<Patio[]> {
    const response = await api.get<Patio[]>('/Patio/all');
    return response.data;
  },

  async getPatioById(id: number): Promise<Patio> {
    const response = await api.get<Patio>(`/Patio/${id}`);
    return response.data;
  },

  async createPatio(data: CreatePatioDTO): Promise<Patio> {
    const response = await api.post<Patio>('/Patio', data);
    return response.data;
  },

  async updatePatio(id: number, data: Partial<CreatePatioDTO>): Promise<Patio> {
    const response = await api.put<Patio>(`/Patio/${id}`, data);
    return response.data;
  },

  async deletePatio(id: number): Promise<void> {
    await api.delete(`/Patio/${id}`);
  },
};

export default patioService;
