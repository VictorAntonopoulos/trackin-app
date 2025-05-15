export type Moto = {
  id: string;
  modelo: 'Mottu Sport 110i' | 'Mottu POP 110i';
  status: 'Disponível' | 'Retirada' | 'Em manutenção';
  placa: string;
  imagemUrl?: string;
  localizacao?: {
    coordenadas: { lat: number; lon: number };
    setor: string;
  };
};
