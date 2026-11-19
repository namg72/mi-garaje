import { CrearVehiculoDatos } from "@/features/vehiculos/types/Vehiculo";
import { agregarVehiculo } from "../repositorios/vehiculosRepositorio";
import { VehiculoModelo } from "../models/Vehiculo";

export const crearVehiculo = async (
  vehiculo: CrearVehiculoDatos,
): Promise<VehiculoModelo> => {
  const vehiculoCreado = await agregarVehiculo(vehiculo);
  return vehiculoCreado;
};
