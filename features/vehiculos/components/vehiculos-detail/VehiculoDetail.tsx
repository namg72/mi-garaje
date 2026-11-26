"use client";

import Link from "next/link";
import type { Vehiculo } from "../../types/Vehiculo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftIcon, CheckIcon, WrenchIcon } from "@phosphor-icons/react";
import { DatosGenerales } from "./detail-tabs/DatosGenerales";
import Especificaciones from "./detail-tabs/Especificaciones";
import { Mantenimiento } from "./detail-tabs/Mantenimiento";
import { Historial } from "./detail-tabs/Historial";
import { Documentos } from "./detail-tabs/Documentos";
import { ModalVehiculo } from "../ModalVehiculo";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { crearVehiculoSchema } from "../../valiaciones/crearVehiculoSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast"

type VehiculoDetailProps = {
  vehiculo: Vehiculo;
};

const actualizarKmSchema = crearVehiculoSchema.pick({ km: true });

export const VehiculoDetail = ({ vehiculo }: VehiculoDetailProps) => {
  const silueta: Record<string, string> = {
    coche: "/imagenes/vehiculos/siluetaCoche.jpg",
    moto: "/imagenes/vehiculos/siluetaMoto.png",
    furgoneta: "/imagenes/vehiculos/siluetaVam.png",
    camion: "/imagenes/vehiculos/siluetaCamion.png",
    autocaravana: "/imagenes/vehiculos/siluetaCamper.png",
  };

  const [kmActualizandose, setKmActualizandose] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<
    z.input<typeof actualizarKmSchema>,
    unknown,
    z.output<typeof actualizarKmSchema>
  >({
    resolver: zodResolver(actualizarKmSchema),
    mode: "onChange",
    defaultValues: {
      km: vehiculo.km?.toString() ?? "",
    },
  });
  const handleEditKm = () => {
    setKmActualizandose(false);
  };
  const guardarKm = async (datos: z.output<typeof actualizarKmSchema>) => {
    try {
      const respuesta = await fetch(`/api/vehiculos/${vehiculo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error("No se ha podido actualizar el kilometraje");
      }

      reset({ km: datos.km?.toString() ?? "" });
      setKmActualizandose(false);
      router.refresh();
      toast.add({
        title: "Kilometraje actualizado correctamente",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: error instanceof Error
          ? error.message
          : "No se ha podido actualizar el kilometraje",
        type: "error",
      });
    }
  };

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
            src={
              vehiculo.foto ||
              silueta[vehiculo.tipo ?? ""] ||
              "/imagenes/vehiculos/siluetaCoche.jpg"
            }
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
              {!kmActualizandose && (
                <span>
                  {vehiculo.km == null
                    ? "Kilometraje sin registrar"
                    : `${vehiculo.km.toLocaleString("es-ES")} km`}
                </span>
              )}
              {!kmActualizandose ? (
                <Button
                  type="button"
                  variant="link"
                  className="h-auto w-fit justify-start p-0 text-sm"
                  onClick={() => setKmActualizandose(true)}
                >
                  Actualizar km
                </Button>
              ) : (
                <form
                  className="flex flex-col gap-2"
                  onSubmit={handleSubmit(guardarKm)}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <label
                      htmlFor="kilometraje-rapido"
                      className="text-sm text-foreground"
                    >
                      Kilometraje
                    </label>
                    <div className="relative w-36">
                      <Input
                        id="kilometraje-rapido"
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={vehiculo.km ?? ""}
                        autoFocus
                        className="h-10 bg-card pr-9"
                        aria-invalid={Boolean(errors.km)}
                        {...register("km")}
                      />

                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-muted-foreground">
                        km
                      </span>
                    </div>
                    <Button
                      type="submit"
                      className="h-10 gap-2 px-4 hover:bg-primary-hover"
                    >
                      <CheckIcon weight="bold" aria-hidden="true" />
                      Guardar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 bg-card px-4"
                      onClick={() => handleEditKm()}
                    >
                      Cancelar
                    </Button>
                  </div>

                  {errors.km && (
                    <p className="text-sm text-destructive">
                      {errors.km.message}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <ModalVehiculo mode="editar" vehiculo={vehiculo} />

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
