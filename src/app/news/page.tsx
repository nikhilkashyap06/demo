import { NewsFeed } from "@/components/news-feed";
import { Hero } from "@/components/hero";
import { dbService } from "@/lib/db-service";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function NewsPage() {
  // Fetch news data on the server side
  const news = await dbService.getNews(6);
  
  return (
    <>
      <Hero page="news">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Company News & Events
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
            Stay current with exhibitions, product launches, and strategic partnerships.
          </p>
        </div>
      </Hero>
      <ScrollReveal direction="up" duration={0.6} delay={0.1} effect="fade">
        <NewsFeed news={news} />
      </ScrollReveal>
    </>
  );
}