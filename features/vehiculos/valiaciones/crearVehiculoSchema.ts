import { z } from "zod";

export const crearVehiculoSchema = z.object({
  marca: z.string().trim().min(1, "La marca es obligatoria"),
  modelo: z.string().trim().min(1, "El modelo es obligatorio"),
  matricula: z
    .string()
    .trim()
    .toUpperCase()
    .min(1, "La matrícula es obligatoria")
    .regex(/^[A-Z0-9]+$/, "La matrícula solo puede contener letras y números"),

  km: z
    .string()
    .trim()
    .refine(
      (valor) =>
        valor === "" ||
        (/^[0-9]+$/.test(valor) && Number.isSafeInteger(Number(valor))),
      { message: "El kilometraje debe ser un entero mayor o igual que cero" },
    )
    .transform((valor) => (valor === "" ? null : Number(valor))),
  fechaPrimeraMatriculacion: z
    .string()
    .refine(
      (valor) => {
        if (valor === "") return true;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;

        const fecha = new Date(`${valor}T00:00:00.000Z`);
        return (
          !Number.isNaN(fecha.getTime()) &&
          fecha.toISOString().slice(0, 10) === valor
        );
      },
      { message: "Introduce una fecha de matriculación válida" },
    )
    .refine((valor) => valor === "" || valor >= "1900-01-01", {
      message: "La matriculación no puede ser anterior a 1900",
    })
    .refine(
      (valor) => {
        if (valor === "") return true;

        const hoy = new Date();
        const limite = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
        return valor <= limite;
      },
      { message: "La matriculación no puede ser posterior a hoy" },
    )
    .transform((valor) => (valor === "" ? null : valor)),
  fechaProximaITV: z
    .string()
    .refine(
      (valor) => {
        if (valor === "") return true;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return false;

        const fecha = new Date(`${valor}T00:00:00.000Z`);
        return (
          !Number.isNaN(fecha.getTime()) &&
          fecha.toISOString().slice(0, 10) === valor
        );
      },
      { message: "Introduce una fecha de ITV válida" },
    )
    .refine(
      (valor) => {
        if (valor === "") return true;

        // Se calcula al validar para que el límite avance cada día.
        const hoy = new Date();
        const anioLimite = hoy.getFullYear() + 4;
        const mes = hoy.getMonth();
        // Ajusta el 29 de febrero si el año límite no es bisiesto.
        const ultimoDia = new Date(anioLimite, mes + 1, 0).getDate();
        const dia = Math.min(hoy.getDate(), ultimoDia);
        const limite = `${anioLimite}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        return valor <= limite;
      },
      { message: "La próxima ITV no puede superar cuatro años desde hoy" },
    )
    .transform((valor) => (valor === "" ? null : valor)),

  observaciones: z
    .string()
    .trim()
    .max(400, "Las observaciones no pueden superar los 400 caracteres"),
  bastidor: z
    .string()
    .trim()
    .toUpperCase()
    .refine((valor) => valor === "" || /^[A-HJ-NPR-Z0-9]{17}$/.test(valor), {
      message: "Introduce un bastidor de 17 caracteres, sin I, O ni Q",
    }),
});
