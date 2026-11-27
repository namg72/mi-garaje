import { useState } from "react";
import { Vehiculo } from "../types/Vehiculo";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useForm, Resolver } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { crearVehiculoSchema } from "../valiaciones/crearVehiculoSchema";

export const useActualizarKilometraje = (vehiculo: Vehiculo) => {
  const [kmActualizandose, setKmActualizandose] = useState<boolean>(false);
  const actualizarKmSchema = crearVehiculoSchema.pick({ km: true });
  const router = useRouter();
  const handleEditKm = () => {
    setKmActualizandose(false);
  };

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
        title:
          error instanceof Error
            ? error.message
            : "No se ha podido actualizar el kilometraje",
        type: "error",
      });
    }
  };

  return {
    kmActualizandose,
    setKmActualizandose,
    guardarKm,
    handleEditKm,
    register,
    handleSubmit,
    errors,
  };
};
