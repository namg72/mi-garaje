import { Resumen } from "@/features/resumen/components/Resumen";
import { Vehiculo } from "@/features/vehiculos/types/Vehiculo";
import { VehiculoModelo } from "@/server/models/Vehiculo";
import { connection } from "next/server";

export default async function Home() {
  await connection();
  const registros = await VehiculoModelo.findAll();

  const vehiculos = registros.map((vehiculo: Vehiculo) => ({
    id: vehiculo.id,
    marca: vehiculo.marca,
    modelo: vehiculo.modelo,
    matricula: vehiculo.matricula,
    km: vehiculo.km,
    foto: vehiculo.foto,
    tipo: vehiculo.tipo,
  }));

  return <Resumen vehiculos={vehiculos} />;
}
