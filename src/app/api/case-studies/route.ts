import { NextResponse } from "next/server";
// Mock data since we can't connect to the database
const mockCaseStudies = [
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
    is_active: 1,
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
    is_active: 1,
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
    is_active: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function GET() {
  // Return mock data since database connection is failing
  return NextResponse.json(mockCaseStudies);
}