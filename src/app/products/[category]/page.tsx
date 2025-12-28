import { notFound } from 'next/navigation';
import { getSiteContent, type ProductCategory } from '@/lib/content';
import { dbService } from '@/lib/db-service'; // Add this import
import Image from 'next/image';
import { ProductCardSection } from '@/components/product-card-section';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
}

interface ProductPageProps {
  params: {
    category: string;
  };
}

const ionImages = ['/1/ion1.png','/1/ion2.png','/1/ion3.png','/1/ion4.png','/1/ion5.png','/1/ion6.png'];
function pickDeterministicImage(key: string) {
  let sum = 0;
  for (let i = 0; i < key.length; i++) {
    sum = (sum * 31 + key.charCodeAt(i)) >>> 0;
  }
  return ionImages[sum % ionImages.length];
}

// Export additional content for each product category
const productDetails: Record<string, { 
  specifications: { label: string; value: string }[];
  applications: string[];
  benefits: string[];
  specImage: string;
}> = {
  "commercial-industrial-ess": {
    specifications: [
      { label: "Capacity Range", value: "100kWh – 5.015MWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
      { label: "Efficiency", value: "≥90%" },
      { label: "Operating Temperature", value: "-10°C to 50°C" },
      { label: "Communication", value: "RS485, Ethernet, 4G" }
    ],
    applications: [
      "Industrial parks and manufacturing facilities",
      "Hospitals and healthcare centers",
      "Data centers and IT facilities",
      "Municipal infrastructure",
      "Commercial office buildings"
    ],
    benefits: [
      "Significant reduction in peak demand charges",
      "Enhanced energy cost savings through load shifting",
      "Improved power quality and grid stability",
      "Reliable backup power during outages",
      "Seamless integration with existing electrical infrastructure"
    ],
    specImage: "/1/ion1.png"
  },
  "large-scale-energy-storage": {
    specifications: [
      { label: "Capacity Range", value: "1.2MWh – 5.015MWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥7000 cycles @ 90% DOD" },
      { label: "Efficiency", value: "≥92%" },
      { label: "Operating Temperature", value: "-20°C to 50°C" },
      { label: "Container Rating", value: "IP54 outdoor protection" }
    ],
    applications: [
      "Utility-scale renewable energy projects",
      "Grid stabilization and frequency regulation",
      "Peak shaving for distribution networks",
      "Renewable energy integration",
      "Microgrid implementations"
    ],
    benefits: [
      "Enables higher penetration of renewable energy",
      "Provides valuable grid services to utilities",
      "Reduces transmission and distribution losses",
      "Supports grid resilience and reliability",
      "Generates revenue through ancillary services"
    ],
    specImage: "/1/ion2.png"
  },
  "residential-energy-storage": {
    specifications: [
      { label: "Capacity Range", value: "5kWh – 35kWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥8000 cycles @ 90% DOD" },
      { label: "Efficiency", value: "≥95%" },
      { label: "Operating Temperature", value: "-10°C to 50°C" },
      { label: "Installation", value: "Wall-mounted or stackable" }
    ],
    applications: [
      "Single-family residential homes",
      "Small businesses and retail shops",
      "Apartment complexes and condos",
      "Remote off-grid locations",
      "Backup power for critical loads"
    ],
    benefits: [
      "Reduced electricity bills through self-consumption",
      "Energy independence and grid independence",
      "Quiet and clean backup power solution",
      "Increased home value and marketability",
      "Simple installation with minimal maintenance"
    ],
    specImage: "/1/ion3.png"
  },
  "rack-mounted-batteries": {
    specifications: [
      { label: "Capacity Range", value: "16kWh – 104kWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
      { label: "Efficiency", value: "≥93%" },
      { label: "Operating Temperature", value: "0°C to 45°C" },
      { label: "Configurations", value: "1P8S & 1P13S options" }
    ],
    applications: [
      "Data centers and server rooms",
      "Telecommunications facilities",
      "Distributed commercial deployments",
      "Critical infrastructure backup",
      "Edge computing installations"
    ],
    benefits: [
      "Hot-swappable modules for continuous operation",
      "High power density in compact footprint",
      "Advanced battery management system",
      "Scalable to meet growing demands",
      "Reduced total cost of ownership"
    ],
    specImage: "/1/ion4.png"
  },
  "hybrid-energy-storage-cabinets": {
    specifications: [
      { label: "Capacity Range", value: "215kWh – 261kWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥7000 cycles @ 90% DOD" },
      { label: "Efficiency", value: "≥91%" },
      { label: "Operating Temperature", value: "-10°C to 50°C" },
      { label: "Integration", value: "Built-in PCS and EMS" }
    ],
    applications: [
      "Industrial parks and manufacturing",
      "Cold chain logistics facilities",
      "Commercial and institutional buildings",
      "Renewable energy integration projects",
      "Peak demand management"
    ],
    benefits: [
      "Integrated power conversion and management",
      "Factory-tested and pre-commissioned systems",
      "Rapid deployment with minimal site work",
      "Optimized performance through unified control",
      "Simplified maintenance and support"
    ],
    specImage: "/1/ion5.png"
  },
  "mobile-ev-charging-storage": {
    specifications: [
      { label: "Capacity Range", value: "241kWh – 3.34MWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
      { label: "Efficiency", value: "≥90%" },
      { label: "Operating Temperature", value: "-20°C to 50°C" },
      { label: "Mobility", value: "Trailer-mounted or containerized" }
    ],
    applications: [
      "Electric vehicle fleet charging",
      "Construction site power solutions",
      "Emergency and disaster response",
      "Remote area electrification",
      "Temporary event power"
    ],
    benefits: [
      "Rapid deployment to any location",
      "Integrated EV charging infrastructure",
      "Smart scheduling and dispatch capabilities",
      "Multi-site energy sharing and optimization",
      "Revenue generation through vehicle-to-grid services"
    ],
    specImage: "/1/ion6.png"
  },
  "flipkart-amazon": {
    specifications: [
      { label: "Platform", value: "Flipkart & Amazon" },
      { label: "Product Range", value: "Solar Products" },
      { label: "Shipping", value: "Pan India" },
      { label: "Warranty", value: "1-3 Years" }
    ],
    applications: [
      "Residential solar installations",
      "Small commercial setups",
      "Off-grid applications",
      "Portable power solutions",
      "Emergency backup systems"
    ],
    benefits: [
      "Easy online purchasing",
      "Fast delivery across India",
      "Genuine products with warranty",
      "Customer support and service",
      "Competitive pricing"
    ],
    specImage: "/1/ion8.png"
  }
};

// export default async function ProductCategoryPage({ params }: ProductPageProps) { 
export default async function ProductCategoryPage(props: ProductPageProps) {
  const params = await props.params;  // ← yahi important fix hai

  try {
    // Validate and decode the category from URL
    if (!params?.category) {
      console.error('No category parameter provided');
      notFound();
    }

    const category = decodeURIComponent(params.category);
    
    // Get site content
    const content = getSiteContent();
    
    if (!content?.products) {
      console.error('No products found in content');
      notFound();
    }
  
  // Safely find the product category by URL slug
  const product = content.products?.find((p: ProductCategory) => {
    const productSlug = p.title.toLowerCase()
      .replace(/[^a-z0-9\s]+/g, '')  // Keep only alphanumeric and spaces
      .replace(/\s+/g, '-')           // Replace spaces with hyphens
      .replace(/-+/g, '-')            // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
    
    return productSlug === category;
  });

    if (!product) {
      console.warn(`Product not found for category: ${category}`);
      notFound();
    }

    // Get detailed content for this product
    const productKey = category;
    const details = productDetails[productKey] || {
      specifications: [],
      applications: [],
      benefits: [],
      specImage: pickDeterministicImage(productKey)
    };

    let dbProducts: Product[] = [];
    try {
      dbProducts = await dbService.getProducts(category);
    } catch (err) {
      console.error("Failed to fetch products from database:", err);
    }

    let specData: { title?: string; description?: string; image_url?: string } | null = null;
    let appData: { title?: string; description?: string; icon_url?: string } | null = null;
    try {
      if (dbProducts.length > 0) {
        const spec = await dbService.getProductSpecification(dbProducts[0].id);
        const app = await dbService.getProductApplication(dbProducts[0].id);
        specData = spec ? { title: spec.title, description: spec.description || undefined, image_url: spec.image_url || undefined } : null;
        appData = app ? { title: app.title, description: app.description || undefined, icon_url: app.icon_url || undefined } : null;
      }
    } catch (e) {
      console.error('Failed to fetch spec/application:', e);
    }

    return (
      <div className="min-h-screen">
        {/* Hero Section with Background Image from public */}
        <div className="relative h-96 w-full">
          <Image
            src={'/images/productgreen.jpeg'}
            alt={product.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
              <p className="text-xl">{product.range}</p>
            </div>
          </div>
        </div>
        
        {/* ION Green Content Section - Added per requirements */}
        <section className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-700 mb-4">ION Green Energy Solutions</h2>
              <p className="text-gray-600 mb-3">
                ION Green is a leading innovator in energy storage solutions, providing advanced battery energy storage systems that are safe, efficient, and environmentally friendly. Our cutting-edge technology ensures reliable performance and longevity for residential, commercial, and industrial applications.
              </p>
              <p className="text-gray-600 mb-3">
                With a global presence in over 100 countries, we continue to drive innovation in sustainable energy solutions. Our dedicated support team is available 24/7 to assist with any technical inquiries, product maintenance, or system optimization needs.
              </p>
              <p className="text-gray-600">
                Trust ION Green for comprehensive support throughout your energy storage journey, from initial consultation to ongoing maintenance and optimization.
              </p>
            </div>
          </div>
        </section>
        
        {/* Product Cards Section - Show database products if available */}
        {dbProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Available Products</h2>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                  Explore our {product.title} solutions
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dbProducts.map((dbProduct) => (
                  <div key={dbProduct.id} className="overflow-hidden border border-slate-200 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="relative h-48 bg-slate-100">
                      <Image
                        src={dbProduct.image_url || pickDeterministicImage(category)}
                        alt={dbProduct.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <span className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {dbProduct.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{dbProduct.name}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2 h-14">{dbProduct.description}</p>
                        
                      <div className="mt-6 flex gap-3">
                        <Link 
                          href="/products/ion-green"
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium text-center"
                        >
                          View Details
                        </Link>
                        <a 
                          href="tel:9202636627"
                          aria-label="Call now"
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
        )}
        
        {/* ION Green Product Title Section */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
              ION Green {product.title}
            </h2>
            <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced battery energy storage solution engineered for maximum efficiency, safety, and longevity
            </p>
          </div>
        </section>
        
        {/* Product Overview Section */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Side - ION Green Related Image */}
              <div className="md:w-1/2 flex items-center justify-center">
                <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={(product as any).image || details.specImage || pickDeterministicImage(productKey)}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Right Side - Product Content */}
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Product Overview</h3>
                <p className="text-slate-600 mb-6">
                  {product.description}
                </p>

                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Key Features:</h4>
                  <ul className="space-y-2 text-slate-600">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h3 className="text-3xl font-bold text-center text-slate-900 mb-4">{specData?.title || 'Technical Specifications'}</h3>
            {specData?.description && (
              <p className="text-center text-lg text-slate-600 mb-8 max-w-3xl mx-auto">{specData.description}</p>
            )}
            <div className="relative mx-auto mb-8 h-64 w-full max-w-3xl overflow-hidden rounded-xl">
              <Image
                src={specData?.image_url || details.specImage}
                alt={`${product.title} Technical Specifications`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {details.specifications.map((spec, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">{spec.label}</h4>
                  <p className="text-green-600 font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h3 className="text-3xl font-bold text-center text-slate-900 mb-4">Applications</h3>
            <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              Designed for diverse environments and use cases across residential, commercial, and industrial sectors
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {details.applications.map((application, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">Application {index + 1}</h4>
                  </div>
                  <p className="text-slate-600">{application}</p>
                </div>
              ))}
              {appData?.title && (
                <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 overflow-hidden">
                      {appData.icon_url ? (
                        <Image src={appData.icon_url} alt="Application icon" width={24} height={24} />
                      ) : (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">{appData.title}</h4>
                  </div>
                  <p className="text-slate-600">{appData.description || ''}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h3 className="text-3xl font-bold text-center text-slate-900 mb-4">Key Benefits</h3>
            <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
              Maximize value and performance with ION Green energy storage solutions
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {details.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start p-6 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Energy Strategy?</h3>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Contact our energy storage experts to discuss how ION Green solutions can optimize your energy costs and enhance reliability.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/contact" 
                className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Request a Consultation
              </a>
              <a 
                href="tel:9202636627"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error in ProductCategoryPage:', error);
    notFound();
  }
}

// Generate static params for all product categories
export async function generateStaticParams() {
  const content = getSiteContent();
  return content.products.map((product) => ({
    category: product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  }));
}
