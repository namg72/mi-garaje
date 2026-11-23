import { borrarVehiculo } from "@/server/services/vehiculosService";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const vehiculoId = Number(id);

  if (
    !/^[0-9]+$/.test(id) ||
    !Number.isSafeInteger(vehiculoId) ||
    vehiculoId <= 0
  ) {
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
