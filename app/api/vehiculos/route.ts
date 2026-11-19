import { crearVehiculo } from "@/server/services/vehiculosService";
import type { CrearVehiculoDatos } from "@/features/vehiculos/types/Vehiculo";

export const POST = async (request: Request) => {
  let contenido: unknown;

  try {
    contenido = await request.json();
  } catch {
    return Response.json(
      { mensaje: "El cuerpo debe contener un JSON válido" },
      { status: 400 },
    );
  }

  if (
    typeof contenido !== "object" ||
    contenido === null ||
    Array.isArray(contenido)
  ) {
    return Response.json(
      { mensaje: "Los datos del vehículo deben ser un objeto" },
      { status: 400 },
    );
  }

  const payload = contenido as Record<string, unknown>;

  const requeridos = ["marca", "modelo", "matricula"] as const;
  const textos: Record<string, string> = {};

  for (const campo of requeridos) {
    const valor = payload[campo];

    if (typeof valor !== "string" || valor.trim() === "") {
      return Response.json(
        { mensaje: `El campo ${campo} es obligatorio y debe ser texto` },
        { status: 400 },
      );
    }

    if (valor.trim().length > 200) {
      return Response.json(
        { mensaje: `El campo ${campo} admite hasta 200 caracteres` },
        { status: 400 },
      );
    }

    textos[campo] = valor.trim();
  }

  const km = payload.km;

  if (
    km != null &&
    (typeof km !== "number" || !Number.isSafeInteger(km) || km < 0)
  ) {
    return Response.json(
      { mensaje: "El kilometraje debe ser un entero mayor o igual que cero" },
      { status: 400 },
    );
  }

  const opcionales = ["bastidor", "observaciones", "foto"] as const;

  for (const campo of opcionales) {
    const valor = payload[campo];

    if (valor != null && typeof valor !== "string") {
      return Response.json(
        { mensaje: `El campo ${campo} debe ser texto o null` },
        { status: 400 },
      );
    }

    textos[campo] = typeof valor === "string" ? valor.trim() : "";
  }

  if (textos.bastidor.length > 17) {
    return Response.json(
      { mensaje: "El bastidor admite hasta 17 caracteres" },
      { status: 400 },
    );
  }

  const fechas = ["fechaProximaITV", "fechaPrimeraMatriculacion"] as const;

  for (const campo of fechas) {
    const valor = payload[campo];

    if (valor == null) {
      continue;
    }

    if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
      return Response.json(
        { mensaje: `El campo ${campo} debe tener formato AAAA-MM-DD` },
        { status: 400 },
      );
    }

    const fecha = new Date(`${valor}T00:00:00.000Z`);

    if (
      Number.isNaN(fecha.getTime()) ||
      fecha.toISOString().slice(0, 10) !== valor
    ) {
      return Response.json(
        { mensaje: `El campo ${campo} contiene una fecha inválida` },
        { status: 400 },
      );
    }

    textos[campo] = valor;
  }

  const datos: CrearVehiculoDatos = {
    marca: textos.marca,
    modelo: textos.modelo,
    matricula: textos.matricula,
    km: typeof km === "number" ? km : null,
    bastidor: textos.bastidor || null,
    observaciones: textos.observaciones || null,
    foto: textos.foto || null,
    fechaProximaITV: textos.fechaProximaITV || null,
    fechaPrimeraMatriculacion: textos.fechaPrimeraMatriculacion || null,
  };

  try {
    const vehiculo = await crearVehiculo(datos);

    return Response.json(
      {
        mensaje: "Vehículo creado con éxito",
        vehiculo,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error al crear el vehículo:", error);

    return Response.json(
      { mensaje: "No se ha podido crear el vehículo" },
      { status: 500 },
    );
  }
};
