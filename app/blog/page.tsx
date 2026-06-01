import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";
import BlogHub from "@/components/blog/BlogHub";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog de Logística, Frete e Transporte Rodoviário | FreteLab",
  description:
    "Acompanhe guias completos, dicas práticas e notícias do setor logístico. Artigos técnicos sobre fretes, custos por km, manutenção e legislação ANTT.",
  alternates: {
    canonical: "/blog",
  },
};

// Force dynamic rendering to fetch fresh posts and prevent compile-time DB connection errors
export const dynamic = "force-dynamic";

export default async function Page() {
  let articles: any[] = [];
  let dbWarning = false;

  try {
    articles = await prisma.article.findMany({
      where: { 
        published: true,
        publishedAt: {
          lte: new Date()
        }
      },
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        author: {
          select: { name: true, email: true },
        },
      },
    });
  } catch (error) {
    console.warn("Database connection warning on public blog index page. Using empty fallback:", error);
    dbWarning = true;
  }

  const faqItems = [
    {
      question: "Qual o objetivo do blog do FreteLab?",
      answer:
        "Nosso blog visa fornecer guias técnicos detalhados e explicações práticas sobre impostos de frete, custos de diesel, resoluções da ANTT e metodologias para que caminhoneiros e gestores operem com maior lucratividade.",
    },
    {
      question: "Quem escreve e revisa os artigos do blog?",
      answer:
        "Todos os artigos são redigidos ou revisados pela nossa equipe de especialistas técnicos, engenheiros de manutenção de frotas e consultores de logística rodoviária com ampla experiência no asfalto brasileiro.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb items={[{ name: "Blog", item: "/blog" }]} />
      
      <main className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <header className="text-center md:text-left space-y-4 max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              Blog do FreteLab
            </h1>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed">
              Guias completos, análises técnicas, dicas de economia e as novidades mais importantes de transporte e logística no Brasil.
            </p>
          </header>

          {/* Database warning alert for local setup check */}
          {dbWarning && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs py-3.5 px-4 rounded-xl max-w-2xl">
              <strong className="font-bold">Nota de Desenvolvimento:</strong> O banco de dados local não está conectado ou configurado. Adicione sua URL de conexão no arquivo `.env` para listar seus posts reais.
            </div>
          )}

          {/* Blog Hub with filter search */}
          <BlogHub initialArticles={articles} />

          {/* AdSense Placement */}
          <AdSenseBanner slot="1000000015" minHeight={250} />

          {/* FAQ Section for blog hub index */}
          <section className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200/80 shadow-sm max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Dúvidas Frequentes</h2>
            <FAQAccordion items={faqItems} id="blog-faq" />
          </section>
        </div>
      </main>
    </>
  );
}
