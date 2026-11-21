import Link from "next/link";

export default function PaginaNoEncontrada() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 text-center shadow-card sm:p-12">
        <p className="mb-4 text-5xl font-bold tracking-tight text-primary">404</p>
        <h1 className="text-2xl font-semibold text-foreground">
          Página no encontrada
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          La página que buscas no existe o ya no está disponible.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Volver al resumen
        </Link>
      </div>
    </section>
  );
}
