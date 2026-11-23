"use client";

import { Separator } from "@/components/ui/separator";
import {
  DotsThreeVerticalIcon,
  IdentificationCardIcon,
  SpeedometerIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Vehiculo } from "../types/Vehiculo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmarModal } from "@/components/ConfirmarModal";
import { useState } from "react";

type vehiculoCardPros = {
  vehiculo: Vehiculo;
};

export const VehiculoCard = ({ vehiculo }: vehiculoCardPros) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  return (
    <article className="relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-card">
      <div className="relative">
        <img
          src={vehiculo.foto || "/imagenes/vehiculos/silueta.jpg"}
          alt={
            `${vehiculo.marca ?? ""} ${vehiculo.modelo ?? ""}`.trim() ||
            "Vehículo sin fotografía"
          }
          className="aspect-[16/9] w-full bg-muted object-cover"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-28 w-28 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.55),transparent_72%)]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                aria-label={`Opciones de ${vehiculo.marca ?? ""} ${vehiculo.modelo ?? ""}`}
                className="absolute top-2 right-2 z-10 flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-black/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <DotsThreeVerticalIcon
                  size={26}
                  weight="bold"
                  aria-hidden="true"
                />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="min-w-44">
            <DropdownMenuItem
              variant="destructive"
              nativeButton
              render={<button type="button" />}
              className="w-full cursor-pointer gap-2 px-3 py-2"
              onClick={() => setModalVisibility(true)}
            >
              <TrashIcon aria-hidden="true" />
              Borrar vehículo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
        <h2 className="text-2xl font-bold tracking-tight">
          {vehiculo.marca} {vehiculo.modelo}
        </h2>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-muted-foreground">
          <span className="flex min-w-0 items-center gap-2">
            <IdentificationCardIcon
              size={22}
              className="shrink-0"
              aria-hidden="true"
            />
            <span className="break-all">Matrícula: {vehiculo.matricula}</span>
          </span>
          <Separator orientation="vertical" className="h-5 self-center" />
          <span className="flex items-center gap-2">
            <SpeedometerIcon
              size={22}
              className="shrink-0"
              aria-hidden="true"
            />
            <span>
              {vehiculo.km == null
                ? "Kilometraje sin registrar"
                : `${vehiculo.km.toLocaleString("es-ES")} km`}
            </span>
          </span>
        </div>
        <Button className="mt-auto h-11 w-full rounded-xl text-base hover:bg-primary-hover">
          <Link href={`/vehiculos/${vehiculo.id}`}>Ver ficha</Link>
        </Button>
      </div>

      <ConfirmarModal
        title="Eliminar vehículo"
        description={`¿Quieres eliminar ${vehiculo.marca ?? ""} ${vehiculo.modelo ?? ""}?`}
        abierto={modalVisibility}
        onOpenChange={setModalVisibility}
        onConfirmar={() => setModalVisibility(false)}
      />
    </article>
  );
};
