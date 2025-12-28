import { getSiteContent } from "@/lib/content";

const certifications = getSiteContent().certifications;

export function CertificationBar() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 py-10 text-xs font-semibold uppercase tracking-[0.3em] text-white/60 md:px-6">
        {certifications.map((item) => (
          <span key={item.label} className="rounded-full border border-white/20 px-4 py-2">
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}

