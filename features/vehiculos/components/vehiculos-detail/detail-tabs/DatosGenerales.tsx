"use client";

import { Vehiculo } from "@/features/vehiculos/types/Vehiculo";
import { PencilSimpleLineIcon } from "@phosphor-icons/react";
import { Textarea } from "@/components/ui/textarea";

type DatosGeneralesProps = {
  vehiculo: Vehiculo;
};

const formatearFecha = (fecha?: string | null) => {
  if (!fecha) return "Sin registrar";
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
};

export const DatosGenerales = ({ vehiculo }: DatosGeneralesProps) => {
  const tipos: Record<string, string> = {
    coche: "Coche",
    moto: "Moto",
    furgoneta: "Furgoneta",
    camion: "Camión",
    autocaravana: "Autocaravana",
  };

  const datos = [
    { etiqueta: "Marca", valor: vehiculo.marca },
    { etiqueta: "Modelo", valor: vehiculo.modelo },
    { etiqueta: "Matrícula", valor: vehiculo.matricula },
    { etiqueta: "Bastidor", valor: vehiculo.bastidor },
    {
      etiqueta: "Primera matriculación",
      valor: formatearFecha(vehiculo.fechaPrimeraMatriculacion),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="tarjeta-seccion min-w-0">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Datos del vehículo
          </h2>
          <dl className="divide-y divide-border">
            {datos.map(({ etiqueta, valor }) => (
              <div
                key={etiqueta}
                className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 py-3 text-sm"
              >
                <dt className="text-muted-foreground">{etiqueta}</dt>
                <dd className="break-words font-medium">
                  {valor || (
                    <span className="font-normal italic text-muted-foreground">
                      Sin registrar
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="tarjeta-seccion min-w-0">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Fechas y seguimiento
          </h2>
          <dl className="divide-y divide-border">
            <div className="grid grid-cols-2 gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">Próxima ITV</dt>
              <dd className="font-medium">
                {formatearFecha(vehiculo.fechaProximaITV)}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">Kilometraje actual</dt>
              <dd className="font-medium">
                {vehiculo.km == null
                  ? "Sin registrar"
                  : `${vehiculo.km.toLocaleString("es-ES")} km`}
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 text-sm">
              <dt className="text-muted-foreground">Última visita al taller</dt>
              <dd className="italic text-muted-foreground">
                Sin información registrada
              </dd>
            </div>
          </dl>
        </section>
      </div>
      <div className="tarjeta-seccion flex flex-col">
        <div className="flex justify-between">
          <p className=" text-lg font-bold">Comentarios</p>
          <div className="flex gap-2">
            <PencilSimpleLineIcon aria-hidden="true" className="text-primary" />
            <p className="text-primary">Editar</p>
          </div>
        </div>
        <div className="mt-6">
          <Textarea value={vehiculo.observaciones ?? ""} readOnly />
        </div>
      </div>
    </div>
  );
};
