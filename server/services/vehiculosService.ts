import { CrearVehiculoDatos } from "@/features/vehiculos/types/Vehiculo";
import {
  agregarVehiculo,
  eliminarVehiculo,
} from "../repositorios/vehiculosRepositorio";
import { VehiculoModelo } from "../models/Vehiculo";

export const crearVehiculo = async (
  vehiculo: CrearVehiculoDatos,
): Promise<VehiculoModelo> => {
  const vehiculoCreado = await agregarVehiculo(vehiculo);
  return vehiculoCreado;
};

export const borrarVehiculo = async (idVehiculo: number): Promise<number> => {
  return eliminarVehiculo(idVehiculo);
};
