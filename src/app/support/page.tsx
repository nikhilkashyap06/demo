import { Hero } from "@/components/hero";
import { SupportResources } from "@/components/support-resources";
import { ContactChannels } from "@/components/contact-channels";
import Image from "next/image";

export default function SupportPage() {
  return (
    <>
      <Hero page="support">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            ION-GREEN Support Center
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
            Your trusted partner for energy storage solutions. Access product manuals, technical specifications, and 24/7 expert support for all ION-GREEN systems.
          </p>
        </div>
      </Hero>
      
      {/* ION Green Supported Title Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
            ION Green Supported
          </h2>
        </div>
      </section>
      
      {/* Sidebar Section with Text and Image */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - ION Green Related Text */}
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ION Green Technology</h3>
              <p className="text-slate-600 mb-4">
                ION Green is a leading innovator in energy storage solutions, providing advanced battery energy storage systems that are safe, efficient, and environmentally friendly.
              </p>
              <p className="text-slate-600 mb-4">
                Our cutting-edge technology ensures reliable performance and longevity for residential, commercial, and industrial applications. With a global presence in over 100 countries, we continue to drive innovation in sustainable energy solutions.
              </p>
              <p className="text-slate-600 mb-4">
                Our dedicated support team is available 24/7 to assist with any technical inquiries, product maintenance, or system optimization needs. Trust ION Green for comprehensive support throughout your energy storage journey.
              </p>
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Key Benefits:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>High-efficiency lithium-ion technology</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>Intelligent energy management systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>Scalable modular designs for various applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-600">✓</span>
                    <span>Comprehensive warranty and support packages</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Side - Image */}
            <div className="md:w-1/2 flex items-center justify-center">
              <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/1/ion8.png"
                  alt="ION Green Technology"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <SupportResources />
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
            ION-GREEN Support Services
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Technical Support</h3>
              <p className="text-slate-600">
                Our team of certified technicians is available 24/7 to assist with any technical queries or issues you may encounter with your ION-GREEN energy storage systems.
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>Remote diagnostics and troubleshooting</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>System performance optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">✓</span>
                  <span>Firmware and software updates</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-md">
              <h3 className="mb-4 text-xl font-semibold text-slate-900">Product Documentation</h3>
              <p className="text-slate-600">
                Access comprehensive documentation for all ION-GREEN products, including installation guides, user manuals, and technical specifications.
              </p>
              <div className="mt-6">
                <h4 className="mb-2 font-medium text-slate-900">Featured Resources:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <a href="#" className="text-blue-600 hover:underline">ION-GREEN Product Catalog 2025</a>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <a href="#" className="text-blue-600 hover:underline">Installation & Commissioning Guide</a>
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">•</span>
                    <a href="#" className="text-blue-600 hover:underline">Safety & Maintenance Manual</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactChannels />
    </>
  );
}