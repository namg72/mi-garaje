"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@base-ui/react";
import { GarageIcon, SignOutIcon } from "@phosphor-icons/react";
export const Header = () => {
  return (
    <div className="flex  items-center p-6 justify-between border-b-2">
      <div className="flex gap-2">
        <GarageIcon size={36} className="text-primary" />
        <p className="font-bold text-2xl">Mi Garaje</p>
      </div>
      <div className="flex items-center gap-4">
        <p>Nacho</p>
        <Separator
          orientation="vertical"
          className="h-5 w-px shrink-0 bg-gray-300"
        />
        <Button
          variant="ghost"
          className="text-black border-black rounded shadow-lg"
        >
          <SignOutIcon />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};
