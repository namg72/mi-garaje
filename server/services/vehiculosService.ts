import {
  ActualizarVehiculoDatos,
  CrearVehiculoDatos,
} from "@/features/vehiculos/types/Vehiculo";
import {
  actualizarVehiculo,
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

export const modificarVehiculo = async (
  idVehiculo: number,
  datos: ActualizarVehiculoDatos,
): Promise<number> => {
  return actualizarVehiculo(idVehiculo, datos);
};
