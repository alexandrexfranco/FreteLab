import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import AdSenseBanner from "@/components/ads/AdSenseBanner";
import { prisma } from "@/lib/prisma";
import "@/app/blog.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article || !article.published || (article.publishedAt && article.publishedAt > new Date())) {
      return {
        title: "Artigo não encontrado | FreteLab",
      };
    }

    return {
      title: `${article.title} | Blog FreteLab`,
      description: article.summary,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: article.title,
        description: article.summary,
        type: "article",
        url: `https://fretelab.com.br/blog/${slug}`,
        publishedTime: article.publishedAt?.toISOString(),
        modifiedTime: article.updatedAt.toISOString(),
      },
    };
  } catch (err) {
    return {
      title: "Artigo | Blog FreteLab",
    };
  }
}

// Force dynamic rendering to prevent database fetch errors during static compilation
export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  let article: any = null;

  try {
    article = await prisma.article.findUnique({
      where: { slug },
      include: {
        category: true,
        author: {
          select: { name: true, email: true },
        },
      },
    });
  } catch (error) {
    console.error("Database connection error fetching article:", error);
  }

  if (!article || !article.published || (article.publishedAt && article.publishedAt > new Date())) {
    notFound();
  }

  // Schema JSON-LD BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.summary,
    "datePublished": article.publishedAt?.toISOString() || article.createdAt.toISOString(),
    "dateModified": article.updatedAt.toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author?.name || "Equipe FreteLab",
    },
    "publisher": {
      "@type": "Organization",
      "name": "FreteLab",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fretelab.com.br/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SEOBreadcrumb
        items={[
          { name: "Blog", item: "/blog" },
          { name: article.title, item: `/blog/${article.slug}` },
        ]}
      />

      <main className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Reading Column */}
          <article className="lg:col-span-8 bg-white p-6 md:p-12 rounded-2xl border border-slate-200/80 shadow-sm space-y-8">
            <header className="space-y-4 border-b border-slate-100 pb-6">
              {/* Category tag and publish date */}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="text-primary">{article.category?.name || "Geral"}</span>
                <span className="text-slate-300">•</span>
                <span>
                  {new Date(article.publishedAt || article.createdAt).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {article.title}
              </h1>
              
              <p className="text-base text-slate-500 font-medium leading-relaxed italic">
                {article.summary}
              </p>
            </header>

            {/* Cover Image Hero */}
            {(article as any).coverImageUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-100 shadow-sm -mx-6 md:-mx-12">
                <img
                  src={(article as any).coverImageUrl}
                  alt={article.title}
                  className="w-full h-56 md:h-80 object-cover"
                />
              </div>
            )}

            {/* Premium ad banner spacing */}
            <AdSenseBanner slot="1000000016" minHeight={90} className="my-2" />

            {/* Article Content — rendered from TipTap HTML */}
            <section
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <AdSenseBanner slot="1000000017" minHeight={250} />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* E-E-A-T Author Box */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-center md:text-left">
              <h3 className="font-extrabold text-sm text-slate-400 uppercase tracking-wider">
                Autor & Revisão
              </h3>
              
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center font-bold text-white text-xl shadow-md select-none shrink-0">
                  FL
                </div>
                <div>
                  <h4 className="font-bold text-white text-md">{article.author?.name || "Equipe FreteLab"}</h4>
                  <span className="text-xs text-slate-400">Especialistas em Transporte</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-normal">
                Este artigo foi elaborado por especialistas em logística e custos de frotas. Fórmulas e dados regulatórios de fretes são verificados de acordo com as resoluções da ANTT e órgãos vigentes.
              </p>

              <div className="pt-2">
                <Link
                  href="/autor"
                  className="text-xs font-bold text-secondary hover:text-secondary-hover underline flex items-center gap-1 justify-center md:justify-start"
                >
                  Conhecer nossa equipe editorial <span>→</span>
                </Link>
              </div>
            </div>

            {/* CTA: Tools Promotion */}
            <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                Calculadoras Gratuitas
              </h3>
              <p className="text-xs text-slate-600 leading-normal">
                Faça o planejamento completo da sua rota em segundos e evite prejuízos na estrada.
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/ferramentas/calculadora-frete"
                  className="bg-primary hover:bg-primary-hover text-white text-xs text-center font-bold py-2.5 rounded-xl transition-all shadow-md shadow-primary/10"
                >
                  Calcular Preço de Frete
                </Link>
                <Link
                  href="/ferramentas/calculadora-custo-operacional"
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs text-center font-bold py-2.5 rounded-xl transition-all"
                >
                  Calcular Custo por KM
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
