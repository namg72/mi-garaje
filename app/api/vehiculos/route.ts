import { crearVehiculo } from "@/server/services/vehiculosService";

export const POST = async (request: Request) => {
  try {
    const payload = await request.json();

    const requeridos = ["marca", "modelo", "matricula"];

    for (const requerido of requeridos) {
      if (
        typeof payload[requerido] !== "string" ||
        payload[requerido].trim() === ""
      ) {
        return Response.json(
          { mensaje: `El campo ${requerido} es obligatorio` },
          { status: 400 },
        );
      }
    }

    if (
      payload.km != null &&
      (!Number.isInteger(payload.km) || payload.km < 0)
    ) {
      return Response.json(
        { mensaje: "El campo km es incorrecto" },

        { status: 400 },
      );
    }

    await crearVehiculo(payload);

    return Response.json(
      { mensaje: "Vehiculo creado con exito" },

      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { mensaje: "No se ha podido crear el vhehiculo" },
      { status: 500 },
    );
  }
};
