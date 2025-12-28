"use client";

import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import Image from "next/image";
import { DetailModal } from "@/components/detail-modal";
import { ScrollReveal } from "@/components/scroll-reveal";

interface LabEquipment {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface LabEquipmentClientProps {
  equipmentItems: LabEquipment[];
  error: string | null;
}

export function LabEquipmentClient({ equipmentItems, error }: LabEquipmentClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    image: "",
    description: "",
    detailedContent: ""
  });

  const openModal = (item: LabEquipment) => {
    setSelectedItem({
      title: item.name,
      image: item.image_url,
      description: item.description,
      detailedContent: item.description // Using description as detailed content for now
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <PageHero 
          title="Lab Equipment"
          description="Advanced testing and measurement equipment for solar energy research and development"
        />
        
        <ScrollReveal direction="up" duration={0.6} delay={0.1} effect="fade">
          <section className="py-20">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <SectionHeading
                eyebrow="Our Equipment"
                title="State-of-the-Art Laboratory Equipment"
                description="ION Green utilizes cutting-edge testing equipment to ensure the highest quality and performance standards for our solar energy products."
              />
              
              <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {equipmentItems.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-md">
                    <div className="h-56 w-full relative">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900">{item.name}</h3>
                      <p className="mt-3 text-slate-600 line-clamp-2 h-14">{item.description}</p>
                      
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => openModal(item)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium text-center"
                        >
                          Read More
                        </button>
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
            </div>
          </section>
        </ScrollReveal>
        
        <ScrollReveal direction="up" duration={0.6} delay={0.2} effect="slide">
          <section className="py-20 bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold text-slate-900">Research & Development Capabilities</h2>
                <p className="mt-4 text-lg text-slate-600">
                  Our laboratory facilities are equipped with industry-leading equipment to conduct comprehensive testing and validation 
                  of our solar energy products. From material analysis to full system performance testing, we ensure every product meets 
                  the highest standards of quality, safety and efficiency.
                </p>
                
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Material Testing</h3>
                    <p className="mt-2 text-slate-600">
                      Advanced spectroscopy and microscopy equipment for analyzing solar cell materials and components.
                    </p>
                  </div>
                  
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Performance Validation</h3>
                    <p className="mt-2 text-slate-600">
                      Comprehensive testing under standard and extreme conditions to validate product performance claims.
                    </p>
                  </div>
                  
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Durability Assessment</h3>
                    <p className="mt-2 text-slate-600">
                      Accelerated aging tests to ensure long-term reliability and warranty compliance.
                    </p>
                  </div>
                  
                  <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-900">Safety Compliance</h3>
                    <p className="mt-2 text-slate-600">
                      Rigorous safety testing to meet international standards and certifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
      
      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedItem.title}
        image={selectedItem.image}
        description={selectedItem.description}
        detailedContent={selectedItem.detailedContent}
      />
    </>
  );
}