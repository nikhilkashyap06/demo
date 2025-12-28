"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { DetailModal } from "@/components/detail-modal";

interface CardProps {
  image: string;
  title: string;
  description: string;
  detailedContent: string;
}

export function ProductCardSection() {
  // Sample data for the cards with detailed content
  const cards: CardProps[] = [
    {
      image: "/1/ion1.png",
      title: "Advanced Energy Storage",
      description: "Cutting-edge battery technology with high efficiency and long lifespan for residential and commercial applications.",
      detailedContent: "Our advanced energy storage systems utilize state-of-the-art lithium-ion battery technology, offering exceptional efficiency rates of up to 95%. With a lifespan of over 10 years and 8000+ charge cycles, these systems provide reliable power storage for both residential and commercial applications. The modular design allows for easy scalability, and our intelligent battery management system ensures optimal performance and safety at all times."
    },
    {
      image: "/1/ion2.png",
      title: "Smart Grid Integration",
      description: "Seamless integration with existing power grids for optimal energy distribution and management.",
      detailedContent: "Our smart grid integration technology enables seamless connectivity between your energy storage system and the existing power grid. This advanced solution provides real-time monitoring, automated load balancing, and intelligent energy distribution. With predictive analytics and machine learning algorithms, the system optimizes energy consumption patterns, reduces peak demand charges, and maximizes savings. The integration supports various communication protocols and can easily adapt to changing grid conditions."
    },
    {
      image: "/1/ion3.png",
      title: "Eco-Friendly Solutions",
      description: "Sustainable energy solutions that reduce carbon footprint and promote environmental responsibility.",
      detailedContent: "ION Green is committed to environmental sustainability through our eco-friendly energy solutions. Our systems are manufactured using recycled materials and RoHS-compliant components. During operation, they produce zero emissions and significantly reduce your carbon footprint. With a recyclability rate of over 95% at end-of-life, our products support circular economy principles. Additionally, our solutions help reduce dependence on fossil fuels and contribute to a cleaner, greener planet for future generations."
    },
    {
      image: "/1/ion4.png",
      title: "24/7 Monitoring",
      description: "Real-time monitoring and analytics to ensure optimal performance and quick issue resolution.",
      detailedContent: "Our comprehensive 24/7 monitoring system provides real-time insights into your energy storage system's performance. With cloud-based analytics and mobile app integration, you can monitor energy production, consumption, and storage from anywhere. The system sends instant alerts for any anomalies and provides predictive maintenance notifications. Advanced diagnostic tools help our technicians resolve issues quickly, ensuring maximum uptime. Detailed performance reports help you track savings and optimize energy usage patterns."
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    image: "",
    description: "",
    detailedContent: ""
  });

  const openModal = (item: CardProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Animation variants for the container
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for each item
  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Animation for the section title
  const titleAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleAnimation}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose ION Green?</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover the advantages of our innovative energy storage solutions
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="group overflow-hidden border border-slate-200 rounded-xl hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
              whileHover={{ 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-white text-2xl font-bold">{card.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">{card.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-2 h-14">{card.description}</p>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => openModal(card)}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 text-sm font-medium text-center transform hover:scale-105"
                  >
                    Read More
                  </button>
                  <a 
                    href="tel:9202636627"
                    className="flex-1 px-4 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-all duration-300 text-sm font-medium text-center transform hover:scale-105"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {isModalOpen && (
        <DetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedItem.title}
          image={selectedItem.image}
          description={selectedItem.description}
          detailedContent={selectedItem.detailedContent}
        />
      )}
    </section>
  );
}
