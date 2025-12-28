import { CertificationBar } from "@/components/certification-bar";
import { CTAPanel } from "@/components/cta-panel";
import { Hero } from "@/components/hero";
import Link from 'next/link';
import Image from 'next/image';
import { dbService } from "@/lib/db-service";
import { ScrollReveal } from "@/components/scroll-reveal";

// Enable ISR (Incremental Static Regeneration) with a revalidation period
export const revalidate = 60; // Revalidate at most every 60 seconds

interface Solution {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default async function SolutionsPage() {
  let solutions: Solution[] = [];
  let error: string | null = null;

  try {
    // Fetch solutions directly from the database
    solutions = await dbService.getSolutions();
  } catch (err) {
    console.error("Failed to fetch solutions:", err);
    error = "Failed to load solutions. Please try again later.";
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Hero page="solutions">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            One Stop Comprehensive Energy Service Provider
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
            Integrated energy storage solutions for utility, commercial & industrial, and residential applications
          </p>
        </div>
      </Hero>

      {/* Solutions Cards Section */}
      <ScrollReveal direction="up" duration={0.6} delay={0.1} effect="fade">
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Energy Solutions</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Discover our comprehensive range of energy storage solutions designed to meet diverse industry needs
              </p>
            </div>
            
            {solutions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No solutions available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {solutions.map((solution) => (
                  <div key={solution.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                    <div className="h-56 w-full relative">
                      <Image
                        src={solution.image_url || '/images/placeholder-solution.jpg'}
                        alt={solution.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{solution.title}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2 h-14">{solution.summary}</p>
                      
                      <div className="flex gap-3 mt-6">
                        <Link
                          href={`/solutions/${solution.slug}`}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium text-center"
                        >
                          Read More
                        </Link>
                        <a 
                          href="tel:+919202836627"
                          className="flex-1 px-4 py-2 bg-white text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors text-sm font-medium text-center"
                        >
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </ScrollReveal>
      
      {/* Additional Content Section */}
      <ScrollReveal direction="up" duration={0.6} delay={0.2} effect="slide">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Energy Storage Solutions</h2>
              <p className="text-lg text-gray-600 mb-12">
                From project design and system integration to installation and after-sales service, ION Green provides end-to-end energy storage solutions tailored to your specific needs.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🔋',
                    title: 'Battery Systems',
                    description: 'High-performance lithium-ion battery systems with advanced BMS for safety and reliability.'
                  },
                  {
                    icon: '⚡',
                    title: 'Power Conversion',
                    description: 'Efficient PCS (Power Conversion Systems) for seamless energy conversion and grid integration.'
                  },
                  {
                    icon: '🌐',
                    title: 'Energy Management',
                    description: 'Intelligent EMS for optimal energy dispatch and system performance monitoring.'
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="up" duration={0.6} delay={0.3} effect="zoom">
        <CertificationBar />
      </ScrollReveal>
      <ScrollReveal direction="up" duration={0.6} delay={0.4} effect="fade">
        <CTAPanel />
      </ScrollReveal>
    </>
  );
}