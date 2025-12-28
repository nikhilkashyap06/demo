import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { SectionHeading } from "./section-heading";

const products = getSiteContent().products;

// Better solar-related images for products
const productImages = [
  "/1/ion1.png",
  "/1/ion2.png",
  "/1/ion3.png",
  "/2/green.png",
  "/3/green1.png",
  "/3/green2.png"
];

export function ProductShowcase() {
  return (
    <section id="products" className="bg-gradient-to-br from-white to-green-50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Products"
          title="Commercial, Industrial & Residential ESS Portfolio"
          description="Modular, scalable systems with liquid- and air-cooled thermal management, hybrid inverters, and integrated EMS."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {products.map((product, index) => (
            <article
              key={product.title}
              className="flex flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={productImages[index % productImages.length]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="flex flex-1 flex-col gap-6 p-8">
                <div>
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    {product.range}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-gray-900">{product.title}</h3>
                  <p className="mt-3 text-gray-600">{product.description}</p>
                </div>
                <ul className="space-y-3">
                  {product.features.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <a 
                    href={`/products/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                  >
                    View Details
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}