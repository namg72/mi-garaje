"use client";

import {
  CarIcon,
  ClipboardTextIcon,
  FileTextIcon,
  HouseIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const rutaActual = usePathname();
  return (
    <div className="p-6 w-60 shrink-0 border-r border-border bg-sidebar ">
      <ul className="space-y-2">
        <li
          aria-current={rutaActual === "/" ? "page" : undefined}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium hover:bg-sidebar-hover ${
            rutaActual === "/"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-hover"
          }`}
        >
          <HouseIcon size={32} />
          <Link href="/">Resumen</Link>
        </li>

        <li
          aria-current={rutaActual === "/vehiculos" ? "page" : undefined}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium hover:bg-sidebar-hover ${
            rutaActual === "/vehiculos"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-hover"
          }`}
        >
          <CarIcon size={32} />

          <Link href="/vehiculos">Vehículos</Link>
        </li>

        <li
          aria-current={rutaActual === "/historia" ? "page" : undefined}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium hover:bg-sidebar-hover ${
            rutaActual === "/historia"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-hover"
          }`}
        >
          <ClipboardTextIcon size={32} />
          <Link href="/historia">Historia</Link>
        </li>

        <li
          aria-current={rutaActual === "/facturas" ? "page" : undefined}
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium hover:bg-sidebar-hover ${
            rutaActual === "/facturas"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-hover"
          }`}
        >
          <FileTextIcon size={32} />
          <Link href="/facturas">Facturas</Link>
        </li>
      </ul>
    </div>
  );
};
