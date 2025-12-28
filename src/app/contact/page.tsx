import { Hero } from "@/components/hero";
import { ContactChannels } from "@/components/contact-channels";
import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function ContactPage() {
  return (
    <>
      <Hero page="contact">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Get in Touch
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
            Our global team is ready to discuss your energy storage needs and provide customized solutions.
          </p>
        </div>
      </Hero>
      <ScrollReveal direction="up" duration={0.6} delay={0.1} effect="fade">
        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 md:grid-cols-2 md:px-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Tell us about your project</h2>
              <p className="text-sm text-slate-600">
                Provide your site load, target capacity, and preferred cooling topology. A ION Green engineer will respond
                within 24 hours.
              </p>
              <ContactForm />
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Global Headquarters</h3>
              <p className="mt-2 text-sm text-slate-600">
                M/s. ION-GREEN ENERGY PVT LTD,
                <br />506,507, 5th Floor Babylon Capital 
                <br />Behind Oswal Petrol Pump,
                <br />G E Road, Raipur 492001, (C.G)
                
                <br />
                
              </p>
              <div className="mt-6 h-64 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300" aria-hidden />
            </div>
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal direction="up" duration={0.6} delay={0.2} effect="slide">
        <ContactChannels />
      </ScrollReveal>
    </>
  );
}

