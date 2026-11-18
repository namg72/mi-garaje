"use client";

import {
  CarIcon,
  ClipboardTextIcon,
  FileTextIcon,
  HouseIcon,
} from "@phosphor-icons/react";

export const Sidebar = () => {
  return (
    <div className="p-6 w-60 shrink-0 border-r border-border bg-sidebar ">
      <ul className="space-y-2">
        <li className="flex items-center gap-3 rounded-xl bg-sidebar-accent px-4 py-3 text-base font-medium text-sidebar-accent-foreground">
          <HouseIcon size={32} />
          Resumen
        </li>

        <li className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-hover">
          <CarIcon size={32} />
          Vehículos
        </li>

        <li className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-hover">
          <ClipboardTextIcon size={32} />0 Historial
        </li>

        <li className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-sidebar-foreground hover:bg-sidebar-hover">
          <FileTextIcon size={32} />
          Facturas
        </li>
      </ul>
    </div>
  );
};
