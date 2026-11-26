import { borrarVehiculo, modificarVehiculo } from "@/server/services/vehiculosService";
import { actualizarVehiculoSchema } from "@/features/vehiculos/valiaciones/actualizarVehiculoSchema";

function validarIdVehiculo(id: string): number | null {
  const vehiculoId = Number(id);

  if (!/^[0-9]+$/.test(id) || !Number.isSafeInteger(vehiculoId) || vehiculoId <= 0) {
    return null;
  }

  return vehiculoId;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const vehiculoId = validarIdVehiculo(id);

  if (vehiculoId === null) {
    return Response.json(
      { mensaje: "El identificador del vehículo no es válido" },
      { status: 400 },
    );
  }

  let contenido: unknown;

  try {
    contenido = await request.json();
  } catch {
    return Response.json(
      { mensaje: "El cuerpo debe contener un JSON válido" },
      { status: 400 },
    );
  }

  const resultado = actualizarVehiculoSchema.safeParse(contenido);

  if (!resultado.success) {
    return Response.json(
      {
        mensaje: "Revisa los datos del vehículo",
        errores: resultado.error.issues.map((error) => ({
          campo: error.path.join("."),
          mensaje: error.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    const actualizados = await modificarVehiculo(vehiculoId, resultado.data);

    if (actualizados === 0) {
      return Response.json(
        { mensaje: "Vehículo no encontrado" },
        { status: 404 },
      );
    }

    return Response.json({ mensaje: "Vehículo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el vehículo:", error);
    return Response.json(
      { mensaje: "No se ha podido actualizar el vehículo" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const vehiculoId = validarIdVehiculo(id);

  if (vehiculoId === null) {
    return Response.json(
      { mensaje: "El identificador del vehículo no es válido" },
      { status: 400 },
    );
  }

  try {
    const eliminados = await borrarVehiculo(vehiculoId);

    if (eliminados === 0) {
      return Response.json(
        { mensaje: "Vehículo no encontrado" },
        { status: 404 },
      );
    }

    return Response.json({ mensaje: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
    return Response.json(
      { mensaje: "No se ha podido eliminar el vehículo" },
      { status: 500 },
    );
  }
}
