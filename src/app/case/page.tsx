import Image from "next/image";
import { Hero } from "@/components/hero";
import { dbService } from '@/lib/db-service';

interface CaseStudy {
  id: number;
  title: string;
  region: string;
  summary: string;
  impact: string[];
  image_url: string;
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default async function CasePage() {
  let caseStudies: CaseStudy[] = [];
  let isLoading = false;

  // Default case studies
  const defaultCaseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Commercial Energy Storage System",
      region: "North America",
      summary: "Deployed a 2MWh energy storage system for a commercial complex, reducing peak demand charges by 40%.",
      impact: [
        "40% reduction in peak demand charges",
        "30% increase in renewable energy usage",
        "Seamless backup during grid outages"
      ],
      image_url: "/images/casegreen.jpeg",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Industrial Microgrid Project",
      region: "Europe",
      summary: "Implemented a 5MWh microgrid solution for an industrial facility, ensuring 24/7 power availability.",
      impact: [
        "99.9% power reliability",
        "50% reduction in carbon footprint",
        "ROI achieved in 3.5 years"
      ],
      image_url: "/images/casegreen.jpeg",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Residential Community Storage",
      region: "Asia",
      summary: "Deployed community energy storage for a residential complex, enabling energy sharing and cost savings.",
      impact: [
        "25% reduction in energy costs",
        "Improved grid stability",
        "Enhanced renewable energy integration"
      ],
      image_url: "/images/casegreen.jpeg",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  try {
    const fetchedCaseStudies = await dbService.getCaseStudies();
    if (fetchedCaseStudies && fetchedCaseStudies.length > 0) {
      caseStudies = fetchedCaseStudies.map((item: any) => ({
        ...item,
        image: item.image_url || "/images/casegreen.jpeg",
        is_active: item.is_active !== undefined ? item.is_active : true
      }));
    } else {
      caseStudies = defaultCaseStudies;
    }
  } catch (_) {
    caseStudies = defaultCaseStudies;
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  return (
    <>
      <Hero page="case">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Case & Project Highlights
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
            Discover how ION Green deployments stabilize energy costs, integrate renewables, and deliver resilient backup power.
          </p>
        </div>
      </Hero>
      
      {/* ION Green Case Title Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
            ION Green Case Studies
          </h2>
        </div>
      </section>
      
      {/* Sidebar Section with Text and Image */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - ION Green Related Content */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ION Green Success Stories</h3>
              <p className="text-slate-600 mb-4">
                ION Green has successfully deployed energy storage solutions across diverse industries and geographies, demonstrating the versatility and reliability of our technology.
              </p>
              <p className="text-slate-600 mb-4">
                Our case studies showcase real-world applications where ION Green systems have delivered measurable benefits in terms of cost savings, energy independence, and environmental impact.
              </p>
              <p className="text-slate-600 mb-4">
                From residential communities to large industrial complexes, our projects highlight the transformative potential of advanced battery energy storage systems in creating a sustainable energy future.
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Project Highlights:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>Over 500 successful deployments globally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>Average ROI achieved in under 4 years</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>Carbon footprint reduction of up to 60%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>99.9% system reliability and uptime</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Side - Image */}
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/3/title2.png"
                  alt="ION Green Case Study"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {caseStudies.map((study) => (
              <article 
                key={study.id || study.title} 
                className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={study.image || study.image_url || "/images/casegreen.jpeg"}
                    alt={study.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-500">{study.region}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{study.title}</h3>
                  <p className="mt-3 text-sm text-slate-600">{study.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {study.impact && study.impact.length > 0 ? (
                      study.impact.map((bullet, index) => (
                        <li key={`${study.id}-impact-${index}`} className="flex items-start gap-2">
                          <span className="text-green-500">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-slate-400 italic">No impact details available</li>
                    )}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
