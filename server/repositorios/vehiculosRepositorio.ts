import { CrearVehiculoDatos } from "@/features/vehiculos/types/Vehiculo";
import { VehiculoModelo } from "../models/Vehiculo";

export const agregarVehiculo = async (
  vehiculo: CrearVehiculoDatos,
): Promise<VehiculoModelo> => {
  const vehiculoAgregado = await VehiculoModelo.create(vehiculo);
  return vehiculoAgregado;
};

export const eliminarVehiculo = async (vehiculoId: number): Promise<number> => {
  return await VehiculoModelo.destroy({
    where: { id: vehiculoId },
  });
};
