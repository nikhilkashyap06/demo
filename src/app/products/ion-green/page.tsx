import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/db-service";

export default async function IonGreenPage() {
  const product = await dbService.getProductBySlug("ion-green");
  const heroImage = product?.image_url || "/1/ion2.png";
  const brochureUrl = product?.brochure_url || product?.image_url || "/1/ion3.png";
  const specs: Array<{ label: string; value: string }> = [
    { label: "Technical Data", value: "1.2MWh Containerized Energy Storage System" },
    { label: "Battery type", value: "3.2V, 314Ah – Lithium iron phosphate (LFP)" },
    { label: "Max. connection number", value: "LFP3.2V/314Ah" },
    { label: "Total energy", value: "1200kWh" },
    { label: "Rated power (0.5P)", value: "600kW" },
    { label: "Voltage range (Battery)", value: "628V–806V" },
    { label: "System", value: "BESS with PCS, EMS, BMS" },
    { label: "Dimension (W*D*H)", value: "6058×2438×2591mm" },
    { label: "Weight", value: "≤30T" },
  ];
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 w-full">
        <Image
          src={heroImage}
          alt="ION Green"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{product?.name || "ION Green"}</h1>
            <p className="text-lg">Energy Storage Solutions</p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-4">ION Green Energy Solutions</h2>
            <p className="text-gray-700 mb-3">
              {product?.description || "ION Green advanced battery energy storage systems provide safe, efficient, and sustainable power for residential, commercial, and industrial applications. Systems are designed for high reliability, long cycle life, and intelligent energy management."}
            </p>
            <p className="text-gray-700 mb-3">
              Global presence in 100+ countries with dedicated 24/7 technical support, performance optimization, and lifecycle services. From consultation to commissioning and maintenance, our experts partner with you at every step.
            </p>
            <p className="text-gray-700">
              Choose ION Green for scalable, eco‑friendly solutions that reduce costs, enhance resilience, and accelerate sustainability goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">High Efficiency</h3>
              <p className="text-slate-700">Optimized charge/discharge for maximum round‑trip efficiency and lower energy costs.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Safe Chemistry</h3>
              <p className="text-slate-700">LiFePO₄ based systems with advanced BMS, thermal protection, and certifications.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Scalable & Modular</h3>
              <p className="text-slate-700">Modular architecture enables smooth expansion from kWh to multi‑MWh deployments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-full md:w-1/2 h-80 rounded-xl overflow-hidden shadow">
              <Image
                src={brochureUrl}
                alt="ION Green System"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Use Cases</h3>
              <ul className="space-y-2 text-slate-700">
                <li>Residential backup and self‑consumption</li>
                <li>Commercial peak shaving and bill optimization</li>
                <li>Industrial reliability and microgrid integration</li>
                <li>Utility‑scale renewable integration and grid services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="relative w-full h-96 rounded-xl overflow-hidden border border-slate-200 bg-white">
              <Image
                src={brochureUrl}
                alt="Technical datasheet"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <dl className="divide-y divide-slate-200">
                {specs.map((s, i) => (
                  <div key={i} className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-slate-600 font-medium">{s.label}</dt>
                    <dd className="col-span-2 text-slate-900">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex gap-3">
                <a
                  href={brochureUrl}
                  download
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
                >
                  Download Datasheet
                </a>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors text-sm font-medium"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
