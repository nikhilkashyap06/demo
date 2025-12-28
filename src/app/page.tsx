// src/app/page.tsx
import { BatteryShowcase } from "@/components/battery-showcase";
import { HeroCarousel } from "@/components/hero-carousel";
import { StatsFlipCards } from "@/components/StatsFlipCards";
import { ProductCarousel } from "@/components/product-carousel";
import { BetterLifeSection } from "@/components/better-life-section";
import { DynamicProductShowcase } from "@/components/dynamic-product-showcase";
import { DynamicSolutionsGrid } from "@/components/dynamic-solutions-grid";
import { CertificationBar } from "@/components/certification-bar";
import { SupportResources } from "@/components/support-resources";
import { NewsFeed } from "@/components/news-feed";
import { ContactChannels } from "@/components/contact-channels";
import { CTAPanel } from "@/components/cta-panel";
import { WhyChooseUs } from "@/components/why-choose-us";
import { SolarEnergySection } from "@/components/solar-energy-section";
import GlobalCoverageSection from "@/components/global-coverage-section";
import { PowerIonGreenSidebar } from "@/components/power-ion-green-sidebar";
import { HomepageSidebars } from "@/components/homepage-sidebars";
import { DynamicLabEquipmentSection } from "@/components/dynamic-lab-equipment-section";
import { dbService } from "@/lib/db-service";
import { StatsSection } from "@/components/stats-section";
import { FeaturesSection } from "@/components/features-section";
import { SolutionsCarousel } from "@/components/solutions-carousel";
import { ScrollReveal } from "@/components/scroll-reveal";

// ISR revalidation
export const revalidate = 60;

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  image_url: string;
  position: number;
  is_active: boolean;
}

export default async function Home() {
  let heroSlides: HeroSlide[] = [];
  
  // Fetch news data
  const news = await dbService.getNews(4);

  try {
    const slides = await dbService.getHeroSlides();
    heroSlides = Array.isArray(slides)
      ? slides.map(slide => ({
          id: slide.id,
          title: slide.title,
          description: slide.description,
          cta_label: slide.cta_label,
          cta_href: slide.cta_href,
          image_url: slide.image_url,
          position: slide.position,
          is_active: slide.is_active,
        }))
      : [];
  } catch (error) {
    console.error("Failed to fetch hero slides:", error);
    heroSlides = [];
  }

  return (
    <>
      <ScrollReveal effect="parallax" parallaxSpeed={15}>
        <HeroCarousel />
      </ScrollReveal>
      <ScrollReveal effect="textReveal" text="Why Choose Our Solutions" maskReveal={true} duration={1.5} delay={0.1}>
        <div className="hover-lift">
          <FeaturesSection />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="imageZoom" duration={0.8} delay={0.2}>
        <div className="hover-lift">
          <StatsSection />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="typing" text="Key Performance Indicators" duration={1.2} delay={0.3}>
        <div className="hover-lift">
          <StatsFlipCards />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="splitScreen" splitDirection="horizontal" duration={1.0} delay={0.4}>
        <div className="hover-lift">
          <BatteryShowcase />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="floating" duration={2.0} delay={0.5}>
        <div className="hover-lift">
          <SolutionsCarousel />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="stagger" staggerChildren={true} staggerDelay={0.1} duration={0.8} delay={0.6}>
        <div className="hover-lift">
          <ProductCarousel />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="svgDraw" duration={1.5} delay={0.7}>
        <div className="hover-lift">
          <BetterLifeSection />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="parallax" parallaxSpeed={8} duration={0.8} delay={0.8}>
        <div className="hover-lift">
          <DynamicProductShowcase />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="textReveal" text="ION Green Solutions" maskReveal={true} duration={1.2} delay={0.9}>
        <div className="hover-lift">
          <PowerIonGreenSidebar />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="imageZoom" duration={1.0} delay={1.0}>
        <div className="hover-lift">
          <SolarEnergySection />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="typing" text="Our Solutions" duration={1.0} delay={1.1}>
        <div className="hover-lift">
          <DynamicSolutionsGrid />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="splitScreen" splitDirection="vertical" duration={1.2} delay={1.2}>
        <div className="hover-lift">
          <GlobalCoverageSection />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="floating" duration={1.8} delay={1.3}>
        <div className="hover-lift">
          <CertificationBar />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="stagger" staggerChildren={true} staggerDelay={0.15} duration={0.9} delay={1.4}>
        <div className="hover-lift">
          <DynamicLabEquipmentSection />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="textReveal" text="Support Resources" maskReveal={true} duration={1.3} delay={1.5}>
        <div className="hover-lift">
          <SupportResources />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="svgDraw" duration={1.6} delay={1.6}>
        <div className="hover-lift">
          <WhyChooseUs />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="splitScreen" splitDirection="horizontal" duration={1.4} delay={1.7}>
        <div className="hover-lift">
          <HomepageSidebars />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="typing" text="Latest News & Updates" duration={1.2} delay={1.8}>
        <div className="hover-lift">
          <NewsFeed news={news} />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="floating" duration={2.0} delay={1.9}>
        <div className="hover-lift">
          <ContactChannels />
        </div>
      </ScrollReveal>
      <ScrollReveal effect="parallax" parallaxSpeed={12} duration={0.8} delay={2.0}>
        <div className="hover-lift">
          <CTAPanel />
        </div>
      </ScrollReveal>
    </>
  );
}