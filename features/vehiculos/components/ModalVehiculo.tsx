"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, PencilSimpleLineIcon } from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { crearVehiculoSchema } from "../valiaciones/crearVehiculoSchema";
import { CrearVehiculoDatos, Vehiculo } from "../types/Vehiculo";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ModalVehiculoProps = {
  mode: "crear" | "editar";
  vehiculo?: Vehiculo;
};

export const ModalVehiculo = ({ mode, vehiculo }: ModalVehiculoProps) => {
  const datosIniciales = mode === "editar" ? vehiculo : undefined;
  const tipoValidado = crearVehiculoSchema.shape.tipo.safeParse(
    datosIniciales?.tipo,
  );
  const valoresIniciales = {
    tipo: tipoValidado.success ? tipoValidado.data : undefined,
    marca: datosIniciales?.marca ?? "",
    modelo: datosIniciales?.modelo ?? "",
    matricula: datosIniciales?.matricula ?? "",
    km: datosIniciales?.km?.toString() ?? "",
    bastidor: datosIniciales?.bastidor ?? "",
    fechaPrimeraMatriculacion: datosIniciales?.fechaPrimeraMatriculacion ?? "",
    fechaProximaITV: datosIniciales?.fechaProximaITV ?? "",
    observaciones: datosIniciales?.observaciones ?? "",
  };

  const [abierto, setAbierto] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<
    z.input<typeof crearVehiculoSchema>,
    unknown,
    z.output<typeof crearVehiculoSchema>
  >({
    resolver: zodResolver(crearVehiculoSchema),
    defaultValues: valoresIniciales,
    mode: "onChange",
  });

  const router = useRouter();

  const items = [
    { label: "Selecciona tipo de vehículo", value: null },
    { label: "Coche", value: "coche" },
    { label: "Moto", value: "moto" },
    { label: "Furgoneta", value: "furgoneta" },
    { label: "Camión", value: "camion" },
    { label: "Autocaravana", value: "autocaravana" },
  ];

  const modaltitle = mode === "crear" ? "Añadir Vehiculo" : "Editar vehiculo";

  const guardarVehiculo = async (datos: CrearVehiculoDatos) => {
    try {
      if (
        mode === "editar" &&
        (!vehiculo?.id ||
          !Number.isSafeInteger(vehiculo.id) ||
          vehiculo.id <= 0)
      ) {
        throw new Error(
          "No se ha podido identificar el vehículo que quieres editar",
        );
      }

      const url =
        mode === "crear" ? "/api/vehiculos" : `/api/vehiculos/${vehiculo!.id}`;
      const respuesta = await fetch(url, {
        method: mode === "crear" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (!respuesta.ok) {
        throw new Error(
          mode === "crear"
            ? "No se ha podido crear el vehículo"
            : "No se ha podido actualizar el vehículo",
        );
      }

      reset();
      setAbierto(false);
      router.refresh();
      toast.add({
        title:
          mode === "crear"
            ? "Vehículo creado correctamente"
            : "Vehículo actualizado correctamente",
        type: "success",
      });
    } catch (error) {
      toast.add({
        title:
          error instanceof Error
            ? error.message
            : "No se ha podido guardar el vehículo",
        type: "error",
      });
    }
  };

  return (
    <Dialog
      open={abierto}
      onOpenChange={(nuevoEstado) => {
        setAbierto(nuevoEstado);
        reset(valoresIniciales);
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant={mode === "editar" ? "outline" : "default"}
            className={
              mode === "editar"
                ? "h-11 border-primary/40 bg-card px-4 text-primary hover:bg-accent hover:text-primary"
                : "shadow-card hover:bg-primary-hover"
            }
          />
        }
      >
        {mode === "editar" && <PencilSimpleLineIcon aria-hidden="true" />}
        {modaltitle}
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[95vw] gap-0 overflow-y-auto p-0 sm:max-w-4xl">
        <DialogHeader className="border-b border-border px-6 py-6 sm:px-8">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-primary">
            {modaltitle}
          </DialogTitle>
        </DialogHeader>
        <form noValidate onSubmit={handleSubmit(guardarVehiculo)}>
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="tipo"
                >
                  Tipo
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Controller
                  name="tipo"
                  control={control}
                  render={({ field }) => (
                    <Select
                      items={items}
                      name={field.name}
                      value={field.value ?? null}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="tipo"
                        ref={field.ref}
                        onBlur={field.onBlur}
                        aria-invalid={Boolean(errors.tipo)}
                        aria-describedby={
                          errors.tipo ? "tipo-error" : undefined
                        }
                        className="w-full bg-card data-[size=default]:h-11"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {items.map((item) => (
                            <SelectItem
                              key={item.value ?? "sin-tipo"}
                              value={item.value}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tipo && (
                  <p
                    id="tipo-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.tipo.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="marca"
                >
                  Marca
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  className="h-11 bg-card"
                  id="marca"
                  aria-invalid={Boolean(errors.marca)}
                  aria-describedby={errors.marca ? "marca-error" : undefined}
                  {...register("marca")}
                  required
                  placeholder="Ej. Audi"
                />
                {errors.marca && (
                  <p
                    id="marca-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.marca.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="modelo"
                >
                  Modelo
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  className="h-11 bg-card"
                  id="modelo"
                  aria-invalid={Boolean(errors.modelo)}
                  aria-describedby={errors.modelo ? "modelo-error" : undefined}
                  {...register("modelo")}
                  required
                  placeholder="Modelo"
                />
                {errors.modelo && (
                  <p
                    id="modelo-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.modelo.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="matricula"
                >
                  Matrícula
                  <span className="text-destructive" aria-hidden="true">
                    *
                  </span>
                </Label>
                <Input
                  className="h-11 bg-card"
                  id="matricula"
                  aria-invalid={Boolean(errors.matricula)}
                  aria-describedby={
                    errors.matricula ? "matricula-error" : undefined
                  }
                  {...register("matricula")}
                  required
                  placeholder="Matrícula"
                />
                {errors.matricula && (
                  <p
                    id="matricula-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.matricula.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="km"
                >
                  Kilometraje
                </Label>
                <Input
                  className="h-11 bg-card"
                  id="km"
                  aria-invalid={Boolean(errors.km)}
                  aria-describedby={errors.km ? "km-error" : undefined}
                  {...register("km")}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Ej. 45000"
                />
                {errors.km && (
                  <p
                    id="km-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.km.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="bastidor"
                >
                  Nº Bastidor
                </Label>
                <Input
                  className="h-11 bg-card"
                  id="bastidor"
                  aria-invalid={Boolean(errors.bastidor)}
                  aria-describedby={
                    errors.bastidor ? "bastidor-error" : undefined
                  }
                  placeholder="Nº de bastidor"
                  {...register("bastidor")}
                />
                {errors.bastidor && (
                  <p
                    id="bastidor-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.bastidor.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="fechaPrimeraMatriculacion"
                >
                  Fecha de primera matriculación
                </Label>
                <Input
                  className="h-11 bg-card"
                  id="fechaPrimeraMatriculacion"
                  aria-invalid={Boolean(errors.fechaPrimeraMatriculacion)}
                  aria-describedby={
                    errors.fechaPrimeraMatriculacion
                      ? "fechaPrimeraMatriculacion-error"
                      : undefined
                  }
                  {...register("fechaPrimeraMatriculacion")}
                  type="date"
                />
                {errors.fechaPrimeraMatriculacion && (
                  <p
                    id="fechaPrimeraMatriculacion-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.fechaPrimeraMatriculacion.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="fechaProximaITV"
                >
                  Próxima ITV
                </Label>
                <Input
                  className="h-11 bg-card"
                  id="fechaProximaITV"
                  aria-invalid={Boolean(errors.fechaProximaITV)}
                  aria-describedby={
                    errors.fechaProximaITV ? "fechaProximaITV-error" : undefined
                  }
                  {...register("fechaProximaITV")}
                  type="date"
                />
                {errors.fechaProximaITV && (
                  <p
                    id="fechaProximaITV-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.fechaProximaITV.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label
                  className="font-normal leading-snug text-muted-foreground"
                  htmlFor="observaciones"
                >
                  Observaciones
                </Label>
                <textarea
                  id="observaciones"
                  aria-invalid={Boolean(errors.observaciones)}
                  aria-describedby={
                    errors.observaciones ? "observaciones-error" : undefined
                  }
                  {...register("observaciones")}
                  placeholder="Notas sobre el vehículo"
                  className="min-h-24 w-full resize-y rounded-lg border border-input bg-card aria-invalid:border-destructive px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
                {errors.observaciones && (
                  <p
                    id="observaciones-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.observaciones.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                Foto del vehículo · opcional
              </p>
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/50 p-6 text-center">
                <ImageIcon
                  size={36}
                  className="text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm text-muted-foreground">
                  Sube una foto de tu vehículo
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="mx-0 mb-0 rounded-b-xl border-t border-border bg-muted/40 px-6 py-5 sm:px-8">
            <DialogClose
              render={
                <Button type="button" variant="outline" className="h-10 px-5">
                  Cancelar
                </Button>
              }
            />
            <Button
              type="submit"
              className="h-10 px-5 hover:bg-primary-hover"
              disabled={
                isSubmitting || !isValid || (mode === "editar" && !isDirty)
              }
            >
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
