import { z } from "zod";
import { crearVehiculoSchema } from "./crearVehiculoSchema";

// El JSON de la API ya recibe el kilometraje como número y las fechas vacías como null.
export const actualizarVehiculoSchema = crearVehiculoSchema
  .extend({
    marca: crearVehiculoSchema.shape.marca.max(200),
    modelo: crearVehiculoSchema.shape.modelo.max(200),
    matricula: crearVehiculoSchema.shape.matricula.max(200),
    km: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER).nullable(),
    fechaPrimeraMatriculacion: crearVehiculoSchema.shape.fechaPrimeraMatriculacion.nullable(),
    fechaProximaITV: crearVehiculoSchema.shape.fechaProximaITV.nullable(),
    bastidor: crearVehiculoSchema.shape.bastidor
      .transform((valor) => valor || null)
      .nullable(),
    observaciones: crearVehiculoSchema.shape.observaciones
      .transform((valor) => valor || null)
      .nullable(),
    foto: z.string().trim().transform((valor) => valor || null).nullable(),
  })
  .partial()
  .strict()
  .refine((datos) => Object.keys(datos).length > 0, {
    message: "Envía al menos un campo para actualizar",
  });
