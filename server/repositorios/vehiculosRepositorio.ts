import { CrearVehiculoDatos } from "@/features/vehiculos/types/Vehiculo";
import { VehiculoModelo } from "../models/Vehiculo";

export const agregarVehiculo = async (
  vehiculo: CrearVehiculoDatos,
): Promise<VehiculoModelo> => {
  const vehiculoAgregado = await VehiculoModelo.create(vehiculo);
  return vehiculoAgregado;
};
