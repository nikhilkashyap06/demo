import Image from "next/image";
import { ScrollReveal } from "@/components/scroll-reveal";

export function HomepageSidebars() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - ION Green Related Content */}
            <ScrollReveal direction="right" duration={0.8} delay={0.1}>
              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">ION Green Excellence</h3>
                  <p className="text-slate-600 mb-4">
                    At ION Green, we're committed to delivering cutting-edge battery energy storage solutions designed for maximum efficiency, safety, and longevity. Our products are engineered to meet the highest industry standards.
                  </p>
                  <p className="text-slate-600 mb-4">
                    With global deployments across residential, commercial, and industrial sectors, our technology ensures reliable performance in diverse environments and applications.
                  </p>
                  <p className="text-slate-600 mb-4">
                    Each product undergoes rigorous testing and quality assurance processes to guarantee optimal performance and customer satisfaction.
                  </p>
                  <div className="mt-6 flex-grow">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">High Energy Density</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">Long Cycle Life</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">Advanced Safety Features</span>
                      </li>
                      <li className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-700">Smart BMS Technology</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column - Second Image Card */}
            <ScrollReveal direction="left" duration={0.8} delay={0.2}>
              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm border border-slate-100">
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Sustainable Solutions</h3>
                  <div className="flex-grow flex items-center justify-center">
                    <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src="/3/title2.png"
                        alt="Innovation & Sustainability"
                        fill
                        className="object-contain fade-in"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-slate-600 text-center">
                      Building a greener tomorrow with clean energy technology
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
