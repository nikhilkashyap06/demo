import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { SectionHeading } from "./section-heading";

const solutions = getSiteContent().solutions;

// Local images for solutions
const solutionImages = [
  "/1/ion1.png",
  "/1/ion2.png",
  "/1/ion3.png",
  "/2/green.png",
  "/3/green1.png"
];

export function SolutionsGrid() {
  return (
    <section className="bg-gradient-to-br from-white to-green-50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Solutions"
          title="Utility, Commercial & Residential Energy Storage"
          description="Tailored engineering, software integration, and lifecycle services that accelerate project delivery."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {solutions.map((solution, index) => {
            // Use local images in sequence
            let imageUrl = solutionImages[index % solutionImages.length];
            
            return (
              <article
                key={solution.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={solution.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {solution.summary}
                  </p>
                  <ul className="space-y-2">
                    {solution.bullets.slice(0, 2).map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <a 
                      href={`/solutions/${solution.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                      className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                    >
                      Learn more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}