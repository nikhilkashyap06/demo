export type NavItem = {
  label: string;
  href: string;
  description?: string;
  items?: Omit<NavItem, 'items'>[];
};

export type StatItem = {
  label: string;
  value: string;
  helper?: string;
};

export type ProductCategory = {
  title: string;
  range: string;
  description: string;
  features: string[];
  image: string;
};

export type HeroSlide = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
};

export type Solution = {
  title: string;
  summary: string;
  bullets: string[];
};

export type Certification = {
  label: string;
};

export type NewsItem = {
  title: string;
  date: string;
  summary: string;
  image: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
};

export type AboutContent = {
  hero: {
    title: string;
    description: string;
    tagline: string;
  };
  stats: StatItem[];
  timeline: { year: string; detail: string }[];
  values: { title: string; description: string }[];
  markets: string[];
};

export type SiteContent = {
  navItems: NavItem[];
  hero: {
    eyebrow: string;
    slides: HeroSlide[];
    stats: StatItem[];
  };
  highlights: StatItem[];
  products: ProductCategory[];
  solutions: Solution[];
  certifications: Certification[];
  news: NewsItem[];
  cta: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  about: AboutContent;
  contact: {
    heading: string;
    description: string;
    channels: ContactChannel[];
  };
  support: {
    resources: { title: string; description: string }[];
    faqs: { question: string; answer: string }[];
  };
};

export const siteContent: SiteContent = {
  navItems: [
    { label: "Home", href: "/" },
    { 
      label: "Products", 
      href: "#products",
      description: "Explore our energy storage solutions",
      items: [
        { 
          label: "Commercial & Industrial ESS", 
          href: "/products/commercial-industrial-ess",
          description: "100kWh – 5.015MWh systems for businesses"
        },
        { 
          label: "Large Scale Energy Storage", 
          href: "/products/large-scale-energy-storage",
          description: "1.2MWh – 5.015MWh for utility applications"
        },
        { 
          label: "Residential Energy Storage", 
          href: "/products/residential-energy-storage",
          description: "5kWh – 35kWh for homes and small businesses"
        },
        { 
          label: "Rack Mounted Batteries", 
          href: "/products/rack-mounted-batteries",
          description: "16kWh – 104kWh for data centers and telecom"
        },
        { 
          label: "Hybrid Energy Storage Cabinets", 
          href: "/products/hybrid-energy-storage-cabinets",
          description: "215kWh – 261kWh with integrated PCS and EMS"
        },
        { 
          label: "Mobile & EV Charging Storage", 
          href: "/products/mobile-ev-charging-storage",
          description: "241kWh – 3.34MWh for mobile and EV charging solutions"
        },
        { 
          label: "Flipkart & Amazon Products", 
          href: "/products/flipkart-amazon",
          description: "Solar products available on e-commerce platforms"
        },
        { 
          label: "View All Products", 
          href: "/products",
          description: "Complete range of energy storage solutions"
        }
      ]
    },
    { 
      label: "Solutions", 
      href: "/solutions",
      description: "Industry-specific energy solutions",
      items: [
        { label: "Commercial & Industrial", href: "/solutions/commercial-industrial" },
        { label: "Utility Scale Energy Storage", href: "/solutions/utility-scale-energy-storage" },
        { label: "Residential All-in-One", href: "/solutions/residential-all-in-one" },
        { label: "Microgrids", href: "/solutions/microgrids" },
        { label: "Renewable Integration", href: "/solutions/renewable-integration" }
      ]
    },
    { label: "About", href: "/about" },
    { label: "Lab Equipment", href: "/lab-equipment" },
    { label: "Support", href: "/support" },
    { label: "Case", href: "/case" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
  hero: {
    eyebrow: "Energy Storage Systems Manufacturer",
    slides: [
      {
        title: "ION Green BESS storage solution provides commercial and industrial energy systems",
        description:
          "Modular, scalable options ranging from 100kWh up to 5MWh with intelligent EMS for peak shaving, load shifting, and backup power.",
        ctaLabel: "Explore Our Solutions",
        ctaHref: "/solutions",
        image: "/1/ion1.png",
      },
      {
        title: "One-stop energy storage system solution for C&I facilities",
        description:
          "Engineering, manufacturing, and integration for manufacturing plants, hospitals, municipal infrastructure, and commercial buildings.",
        ctaLabel: "Explore Our Solutions",
        ctaHref: "/solutions",
        image: "/1/ion2.png",
      },
      {
        title: "Your trusted one-stop energy storage solution provider",
        description:
          "Safe and efficient end-to-end energy storage solutions spanning residential, commercial, and utility-scale deployments worldwide.",
        ctaLabel: "Request a Quote",
        ctaHref: "/contact",
        image: "/1/ion3.png",
      },
    ],
    stats: [
      { label: "Production Bases", value: "5+", helper: "Across China" },
      { label: "Years Experience", value: "25+", helper: "Since 1999" },
      { label: "Employees", value: "6000+", helper: "Global workforce" },
      { label: "Patents", value: "1180+", helper: "Innovation filed" },
    ],
  },
  highlights: [
    { label: "Residential ESS shipped annually", value: "2GWh+" },
    { label: "C&I & Utility ESS capacity", value: "20GWh+" },
    { label: "Employees", value: "6000+" },
    { label: "Patents", value: "1180+" },
  ],
  products: [
    {
      title: "Commercial & Industrial ESS",
      range: "100kWh – 5.015MWh",
      description:
        "Modular cabinet and containerized systems for industrial parks, hospitals, data centers, and municipal infrastructure.",
      features: [
        "Air-cooled & liquid-cooled options",
        "Peak shaving and load shifting",
        "UL9540, UL1973, CE compliant",
      ],
      image: "/1/ion1.png",
    },
    {
      title: "Large Scale Energy Storage",
      range: "1.2MWh – 5.015MWh",
      description:
        "Containerized battery energy storage systems for utility-scale microgrids, renewable integration, and grid services.",
      features: [
        "Outdoor-rated containers",
        "High-safety LFP chemistry",
        "Smart EMS integration",
      ],
      image: "/1/ion2.png",
    },
    {
      title: "Residential Energy Storage",
      range: "5kWh – 35kWh",
      description:
        "Wall-mounted, stack-mounted, and all-in-one ESS for homes and small businesses with hybrid inverter options.",
      features: [
        "Seamless solar integration",
        "Backup power ready",
        "Expandable capacity modules",
      ],
      image: "/1/ion3.png",
    },
    {
      title: "Rack Mounted Batteries",
      range: "16kWh – 104kWh",
      description:
        "High-voltage ESS racks and battery modules for data halls, telecom, and distributed commercial deployments.",
      features: [
        "Hot-swappable modules",
        "1P8S & 1P13S configurations",
        "Smart thermal management",
      ],
      image: "/1/ion4.png",
    },
    {
      title: "Hybrid Energy Storage Cabinets",
      range: "215kWh – 261kWh",
      description:
        "Air-cooled and liquid-cooled hybrid cabinets with integrated PCS and EMS for industrial parks and cold-chain logistics.",
      features: [
        "Factory-built safety systems",
        "Peak shaving & valley filling",
        "Designed for harsh climates",
      ],
      image: "/1/ion5.png",
    },
    {
      title: "Mobile & EV Charging Storage",
      range: "241kWh – 3.34MWh",
      description:
        "Mobile charging robots and containerized storage to support EV fleets, remote construction, and emergency backup.",
      features: [
        "Rapid deployment trailers",
        "Integrated fast-charging piles",
        "Smart dispatch scheduling",
      ],
      image: "/1/ion6.png",
    },
    {
      title: "Flipkart & Amazon",
      range: "Solar Products",
      description:
        "Solar products available via Flipkart & Amazon with warranty and pan-India shipping.",
      features: [
        "Easy online purchasing",
        "Fast pan-India delivery",
        "Genuine products with warranty",
      ],
      image: "/1/ion8.png",
    },
  ],
  solutions: [
    {
      title: "Utility Scale Energy Storage",
      summary:
        "Optimize energy efficiency, enable renewable integration, and provide grid services with turnkey BESS containers.",
      bullets: [
        "Up to 5.015MWh per containerized block",
        "Advanced safety with multi-level protection",
        "SCADA & EMS ready for remote operations",
      ],
    },
    {
      title: "Commercial & Industrial",
      summary:
        "Reduce peak demand charges, stabilize power supply, and ensure business continuity for manufacturing and logistics sites.",
      bullets: [
        "Hybrid inverters 10kW – 50kW",
        "Demand-side energy management",
        "Flexible financing & O&M packages",
      ],
    },
    {
      title: "Residential All-in-One",
      summary:
        "Smart home battery systems with wall-mounted and stackable options to pair with rooftop solar or EV charging.",
      bullets: [
        "Indoor/outdoor rated enclosures",
        "App-based monitoring",
        "All-in-one ESS with hybrid inverter",
      ],
    },
    {
      title: "Microgrids",
      summary:
        "Independent energy systems that can operate connected to or disconnected from the main grid, providing resilience and energy independence.",
      bullets: [
        "Islandable operation for critical facilities",
        "Integration with renewable sources and storage",
        "Advanced control systems for optimal energy management",
      ],
    },
    {
      title: "Renewable Integration",
      summary:
        "Seamlessly integrate solar, wind, and other renewable energy sources with battery storage for maximum efficiency and reliability.",
      bullets: [
        "Smart inverters for renewable source optimization",
        "Battery storage for energy smoothing and shifting",
        "Predictive analytics for renewable energy forecasting",
      ],
    },
  ],
  certifications: [
    { label: "UL9540" },
    { label: "UL1973" },
    { label: "CB/CE" },
    { label: "CEI-021" },
    { label: "ISO9001" },
  ],
  news: [
    {
      title:
        "Chairman Xu Xinjian Leads Delegation to UN Climate Summit in Brazil",
      date: "Nov 24, 2025",
      summary:
        "ION Green showcases large-scale BESS innovation and signs strategic cooperation on climate resiliency.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Best BESS Battery Storage for Sale: C&I Solutions",
      date: "Nov 20, 2025",
      summary:
        "A deep dive into integrated containerized storage solutions delivering superior LCOE for commercial fleets.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "ION Green BESS at Africa EV Mobility Expo 2025",
      date: "Nov 18, 2025",
      summary:
        "Introducing wholesale energy storage cabinets, all-in-one ESS, and EV charging integrations tailored for Africa.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Nigerian Partner Completes 12,000KM Factory Review",
      date: "Nov 17, 2025",
      summary:
        "Three-day deep dive highlights ION Green high-safety lithium technology designed for African climates.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Industrial & Commercial 215kWh LiFePO₄ Module Supplier Spotlight",
      date: "Nov 12, 2025",
      summary:
        "Where to source 215kWh cabinets, 314Ah modules, and wholesale storage racks for commercial backup power.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Commercial Energy Storage in Bulgaria",
      date: "Nov 10, 2025",
      summary:
        "Delivering large battery storage containers that stabilize Bulgarian C&I operations and accelerate sustainability goals.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ],
  cta: {
    title: "Ready to Start Your Energy Storage Journey?",
    description:
      "Request a customized proposal or connect with our engineering team to scope the right ESS for your site.",
    primary: { label: "Talk to an Expert", href: "/contact" },
    secondary: { label: "See Case Studies", href: "/case" },
  },
  about: {
    hero: {
      title: "Pioneering Energy Storage Solutions",
      description:
        "ION Green is a leading innovator in energy storage, delivering advanced battery energy storage systems to 100+ countries with a focus on sustainability and efficiency.",
      tagline: "Powering a Sustainable Future",
    },
    stats: [
      { label: "Production Bases", value: "5+", helper: "Across China" },
      { label: "Employees", value: "6000+", helper: "Global workforce" },
      { label: "Patents", value: "1180+", helper: "Granted worldwide" },
      { label: "Residential ESS Output", value: "2GWh+", helper: "Annual capacity" },
      { label: "C&I & Utility ESS Output", value: "20GWh+", helper: "Annual capacity" },
    ],
    timeline: [
      { year: "1999", detail: "ION Green founded with focus on energy storage innovation." },
      { year: "2008", detail: "Expanded manufacturing bases and R&D for ESS platforms." },
      { year: "2015", detail: "Began exporting integrated ESS cabinets to global partners." },
      { year: "2020", detail: "Listed on Shanghai Stock Exchange (Stock code: 603366)." },
      {
        year: "2025",
        detail: "20GWh+ annual production capacity for commercial, industrial, and large-scale ESS.",
      },
    ],
    values: [
      {
        title: "One-Stop Service",
        description: "From needs assessment and design to installation, O&M, and lifecycle upgrades.",
      },
      {
        title: "Efficient Storage Solutions",
        description: "Lower energy costs through peak shaving, load shifting, and demand-side management.",
      },
      {
        title: "Smart Management",
        description: "Advanced EMS, SCADA connectivity, and remote monitoring for every project tier.",
      },
      {
        title: "Renewable Integration",
        description: "Seamlessly pair storage with renewable energy sources and EV charging infrastructure.",
      },
    ],
    markets: [
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "Australia",
      "Brazil",
      "Philippines",
      "Nigeria",
      "Morocco",
      "United Arab Emirates",
    ],
  },
  contact: {
    heading: "Global Sales & Support",
    description:
      "ION Green serves more than 100 countries with multilingual support teams and local partners.",
    channels: [
      { label: "WhatsApp", value: "9202636627", href: "https://wa.me/9202636627" },
      { label: "Hotline", value: "9202636627", href: "tel:9202636627" },
      { label: "Email", value: "info@ion-green.com", href: "mailto:info@ion-green.com" },
    ],
  },
  support: {
    resources: [
      {
        title: "Company Brochure",
        description: "Download the 2025 corporate profile, certifications, and manufacturing overview.",
      },
      {
        title: "Product Sheets",
        description: "Specs for air-cooled, liquid-cooled, rack-mounted, and containerized ESS lines.",
      },
      {
        title: "Certifications",
        description: "UL, CE, CEI-021, and other compliance documents for global deployments.",
      },
    ],
    faqs: [
      {
        question: "What capacity ranges do you cover?",
        answer:
          "We deliver from 5kWh residential packs up to 5.015MWh containerized systems, configurable for grid-tied or off-grid applications.",
      },
      {
        question: "Do you support turnkey installation?",
        answer:
          "Yes. ION Green provides engineering, procurement, construction, and lifecycle O&M through global partners.",
      },
      {
        question: "Which battery chemistry is used?",
        answer:
          "High-safety LiFePO₄ prismatic cells (Grade A 105Ah / 280Ah / 314Ah) with multi-level BMS protection.",
      },
    ],
  },
};

export function getSiteContent(): SiteContent {
  return siteContent;
}
