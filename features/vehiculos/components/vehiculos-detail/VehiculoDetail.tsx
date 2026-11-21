"use client";

import Link from "next/link";
import type { Vehiculo } from "../../types/Vehiculo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeftIcon,
  PencilSimpleLineIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import { DatosGenerales } from "./detail-tabs/DatosGenerales";
import Especificaciones from "./detail-tabs/Especificaciones";
import { Mantenimiento } from "./detail-tabs/Mantenimiento";
import { Historial } from "./detail-tabs/Historial";
import { Documentos } from "./detail-tabs/Documentos";

type VehiculoDetailProps = {
  vehiculo: Vehiculo;
};

export const VehiculoDetail = ({ vehiculo }: VehiculoDetailProps) => {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeftIcon size={18} aria-hidden="true" />
        Volver al resumen
      </Link>

      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
          <img
            src={vehiculo.foto || "/imagenes/vehiculos/silueta.jpg"}
            alt={
              `${vehiculo.marca ?? ""} ${vehiculo.modelo ?? ""}`.trim() ||
              "Vehículo sin fotografía"
            }
            className="aspect-[16/9] w-full max-w-56 shrink-0 rounded-lg object-cover sm:w-44"
          />
          <Separator
            orientation="vertical"
            className="hidden self-center sm:block sm:h-20"
          />
          <div className="flex min-w-0 flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {vehiculo.marca} {vehiculo.modelo}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span className="rounded-md bg-muted px-2.5 py-1 font-medium text-foreground">
                {vehiculo.matricula}
              </span>
              <Separator orientation="vertical" className="h-4 self-center" />
              <span>
                {vehiculo.km == null
                  ? "Kilometraje sin registrar"
                  : `${vehiculo.km.toLocaleString("es-ES")} km`}
              </span>
              <Button
                type="button"
                variant="link"
                className="h-auto w-fit justify-start p-0 text-sm"
              >
                Actualizar km
              </Button>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 border-primary/40 bg-card px-4 text-primary hover:bg-accent hover:text-primary"
          >
            <PencilSimpleLineIcon aria-hidden="true" />
            Editar vehículo
          </Button>
          <Button type="button" className="h-11 px-4 hover:bg-primary-hover">
            <WrenchIcon aria-hidden="true" />
            Registrar trabajo
          </Button>
        </div>
      </header>
      <Tabs defaultValue="datos-generales" className="gap-6">
        <div className="overflow-x-auto border-b border-border pb-1">
          <TabsList variant="line" aria-label="Secciones del vehículo">
            <TabsTrigger
              value="datos-generales"
              className="px-4 data-active:text-primary after:bg-primary"
            >
              Datos generales
            </TabsTrigger>
            <TabsTrigger
              value="especificaciones"
              className="px-4 data-active:text-primary after:bg-primary"
            >
              Especificaciones
            </TabsTrigger>
            <TabsTrigger
              value="mantenimiento"
              className="px-4 data-active:text-primary after:bg-primary"
            >
              Mantenimiento
            </TabsTrigger>
            <TabsTrigger
              value="historial"
              className="px-4 data-active:text-primary after:bg-primary"
            >
              Historial
            </TabsTrigger>
            <TabsTrigger
              value="documentos"
              className="px-4 data-active:text-primary after:bg-primary"
            >
              Documentos y enlaces
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="datos-generales">
          <DatosGenerales vehiculo={vehiculo} />
        </TabsContent>
        <TabsContent value="especificaciones">
          <Especificaciones />
        </TabsContent>
        <TabsContent value="mantenimiento">
          <Mantenimiento />
        </TabsContent>
        <TabsContent value="historial">
          <Historial />
        </TabsContent>
        <TabsContent value="documentos">
          <Documentos />
        </TabsContent>
      </Tabs>
    </div>
  );
};
