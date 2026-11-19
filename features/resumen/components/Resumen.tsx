"use Client";

import { Button } from "@/components/ui/button";
import { ModalCrearVehiculo } from "@/features/vehiculos/components/ModalCrearVehiculo";
import { VehiculoCard } from "@/features/vehiculos/components/VehiculoCard";
import { Vehiculo } from "@/features/vehiculos/types/Vehiculo";

type ResumenProps = {
  vehiculos: Vehiculo[];
};

export const Resumen = ({ vehiculos }: ResumenProps) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex p-8 justify-between border-b">
        <div>
          <p className="text-xl font-bold">Resumen</p>
        </div>
        <div>
          <ModalCrearVehiculo />
        </div>
      </div>
      <div className=" p-8 grid grid-cols-2 gap-6">
        {vehiculos.map((vehiculo) => {
          return <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} />;
        })}
      </div>
    </div>
  );
};
