import { VehiculoModelo } from "@/server/models/Vehiculo";
import { VehiculoDetail } from "@/features/vehiculos/components/vehiculos-detail/VehiculoDetail";
import { notFound } from "next/navigation";
import { connection } from "next/server";

const DetalleVehiculoPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const vehiculoId = Number(id);

  if (
    !/^[0-9]+$/.test(id) ||
    !Number.isSafeInteger(vehiculoId) ||
    vehiculoId <= 0
  ) {
    notFound();
  }

  await connection();
  const vehiculo = await VehiculoModelo.findByPk(vehiculoId);

  if (!vehiculo) {
    notFound();
  }

  return <VehiculoDetail vehiculo={vehiculo.toJSON()} />;
};

export default DetalleVehiculoPage;
