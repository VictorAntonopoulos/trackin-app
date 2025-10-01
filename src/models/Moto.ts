export interface Coordenadas {
  lat: number;
  lon: number;
}

export interface Localizacao {
  coordenadas: Coordenadas;
  setor: string;
}

export interface Moto {
  id: number;
  patioId: number;
  modelo: string;
  status: string; 
  placa: string;
  ano: number;
  rfidTag?: string;
  ultimaManutencao?: string;
  imagemReferencia?: string;
  caracteristicasVisuais?: string;
  localizacao?: Localizacao; 
}

export interface CreateMotoDTO {
  patioId: number;
  modelo: string;
  status: string;
  placa: string;
  ano: number;
  rfidTag?: string;
  ultimaManutencao?: string;
  imagemReferencia?: string;
  caracteristicasVisuais?: string;
}

export interface EditMotoDTO {
  id: number;
  patioId: number;
  modelo: string;
  status: string;
  placa: string;
  ano: number;
  rfidTag?: string;
  ultimaManutencao?: string;
  imagemReferencia?: string;
  caracteristicasVisuais?: string;
}

