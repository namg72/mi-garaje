export type Vehiculo = {
  id?: number;
  marca?: string;
  modelo?: string;
  matricula?: string;
  km?: number | null;
  fechaProximaITV?: string | null;
  bastidor?: string | null;
  fechaPrimeraMatriculacion?: string | null;
  observaciones?: string | null;
  foto?: string | null;
  tipo?: string | null;
};

export type CrearVehiculoDatos = {
  tipo: string;
  marca: string;
  modelo: string;
  matricula: string;
  km?: number | null;
  fechaProximaITV?: string | null;
  bastidor?: string | null;
  fechaPrimeraMatriculacion?: string | null;
  observaciones?: string | null;
  foto?: string | null;
};
