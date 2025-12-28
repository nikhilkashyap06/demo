import { notFound } from "next/navigation";
import Image from "next/image";
import { dbService } from "@/lib/db-service";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export default async function NewsDetailPage(props: NewsPageProps) {
  const { slug } = await props.params;

  const item = await dbService.getNewsBySlug(slug);
  if (!item) {
    notFound();
  }

  const publishLabel = item.publish_date;
  const createdAt = new Date(item.created_at).toLocaleDateString();

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 w-full">
        <Image
          src={item.image_url || "/1/ion1.png"}
          alt={item.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{item.title}</h1>
            <div className="flex justify-center space-x-4 text-sm md:text-base opacity-90">
              {publishLabel && <p>Publish Date: {publishLabel}</p>}
              <p>Created: {createdAt}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {item.summary && (
          <p className="text-lg text-slate-700 mb-6">{item.summary}</p>
        )}
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: item.content || "" }} />
        </div>
      </div>
    </div>
  );
}