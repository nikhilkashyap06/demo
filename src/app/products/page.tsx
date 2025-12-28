import { dbService } from "@/lib/db-service";
import { getSiteContent } from "@/lib/content"; // Add this import
import Image from "next/image";
import { Hero } from "@/components/hero";
import { NewsletterSubscribe } from "@/components/newsletter-subscribe";
import { ContactChannels } from "@/components/contact-channels";
import { ProductCardSection } from "@/components/product-card-section";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

// Enable ISR (Incremental Static Regeneration) with a revalidation period
export const revalidate = 60; // Revalidate at most every 60 seconds

// Define the Product interface to match the database structure
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_featured: boolean;
}

export default async function ProductsPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    // Fetch products directly from the database
    products = await dbService.getProducts();
  } catch (err) {
    console.error("Failed to fetch products:", err);
    error = "Failed to load products. Please try again later.";
  }

  // Group products by category
  const productsByCategory: Record<string, Product[]> = {};
  products.forEach(product => {
    if (!productsByCategory[product.category]) {
      productsByCategory[product.category] = [];
    }
    productsByCategory[product.category].push(product);
  });

  // Get site content for category information
  const siteContent = getSiteContent();
  const categoryInfo = siteContent.products.reduce((acc, product) => {
    const slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    acc[slug] = product;
    return acc;
  }, {} as Record<string, typeof siteContent.products[0]>);

  return (
    <div className="min-h-screen bg-white">
      <Hero page="products" />
      
      {/* ION Green Content Section - Added per requirements */}
      <ScrollReveal direction="up" duration={0.6} delay={0.1} effect="fade">
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
      </ScrollReveal>
      
      {/* Product Cards Section */}
      <ScrollReveal direction="up" duration={0.6} delay={0.2} effect="zoom">
        <ProductCardSection />
      </ScrollReveal>
      
      <ScrollReveal direction="up" duration={0.6} delay={0.3} effect="slide">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Energy Storage Solutions</h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Advanced battery energy storage systems for residential, commercial, industrial, and utility-scale applications
            </p>
          </div>

          {/* Display products grouped by category */}
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : Object.keys(productsByCategory).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products available at the moment.</p>
            </div>
          ) : (
            <>
              {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                <section key={category} className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">
                      {categoryInfo[category]?.title || category}
                    </h2>
                    <a 
                      href={`/products/${category}`} 
                      className="text-green-600 hover:text-green-700 font-medium flex items-center"
                    >
                      View All
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="overflow-hidden border border-slate-200 rounded-lg hover:shadow-lg transition-shadow">
                        <div className="relative h-48 bg-slate-100">
                          <Image
                            src={product.image_url || '/images/placeholder-product.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <span className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {product.category}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">{product.name}</h3>
                          <p className="text-slate-600 mb-4 line-clamp-2 h-14">{product.description}</p>
                          
                          <div className="mt-6 flex gap-3">
                            <Link 
                              href={`/products/${product.category}`}
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
                </section>
              ))}
            </>
          )}
        </div>
      </ScrollReveal>

      {/* Newsletter Section */}
      <ScrollReveal direction="up" duration={0.6} delay={0.4} effect="fade">
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated with Our Latest Products
              </h2>
              <p className="text-gray-600 mb-8">
                Subscribe to our newsletter to receive updates on new products, special offers, and industry insights.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterSubscribe />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
      
      <ScrollReveal direction="up" duration={0.6} delay={0.5} effect="slide">
        <ContactChannels />
      </ScrollReveal>
    </div>
  );
}
