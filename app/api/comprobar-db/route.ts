import { conexionDB } from "@/server/database/conexion";
import { VehiculoModelo } from "@/server/models/Vehiculo";

/* export const GET = async () => {
  try {
    await conexionDB.authenticate();
    return Response.json(
      {
        mensaje: "Conexión correcta",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { mensaje: "No se ha podido conectar a bd" },
      { status: 500 },
    );
  }
};
 */
export async function GET() {
  try {
    const vehiculos = await VehiculoModelo.findAll();

    return Response.json(vehiculos);
  } catch (error) {
    console.error("Error al consultar los vehículos:", error);

    return Response.json(
      { mensaje: "No se han podido consultar los vehículos" },
      { status: 500 },
    );
  }
}
