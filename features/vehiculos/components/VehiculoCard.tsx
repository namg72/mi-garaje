"use client";

import { Separator } from "@/components/ui/separator";
import { IdentificationCardIcon, SpeedometerIcon } from "@phosphor-icons/react";
import { Vehiculo } from "../types/Vehiculo";
import { Button } from "@/components/ui/button";

type vehiculoCardPros = {
  vehiculo: Vehiculo;
};

export const VehiculoCard = ({ vehiculo }: vehiculoCardPros) => {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-card">
      <img
        src={vehiculo.foto || "/imagenes/vehiculos/silueta.jpg"}
        alt={`${vehiculo.marca ?? ""} ${vehiculo.modelo ?? ""}`.trim() || "Vehículo sin fotografía"}
        className="aspect-[16/9] w-full bg-muted object-cover"
      />
      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {vehiculo.marca} {vehiculo.modelo}
        </h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-muted-foreground">
          <span className="flex min-w-0 items-center gap-2">
            <IdentificationCardIcon size={22} className="shrink-0" aria-hidden="true" />
            <span className="break-all">Matrícula: {vehiculo.matricula}</span>
          </span>
          <Separator orientation="vertical" className="h-5 self-center" />
          <span className="flex items-center gap-2">
            <SpeedometerIcon size={22} className="shrink-0" aria-hidden="true" />
            <span>
              {vehiculo.km == null
                ? "Kilometraje sin registrar"
                : `${vehiculo.km.toLocaleString("es-ES")} km`}
            </span>
          </span>
        </div>
        <Button className="mt-auto h-11 w-full rounded-xl text-base hover:bg-primary-hover">
          Ver ficha
        </Button>
      </div>
    </article>
  );
};
