import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fretelab.com.br";

  const staticPages = [
    "",
    "/sobre",
    "/autor",
    "/metodologia",
    "/politica-de-privacidade",
    "/termos-de-uso",
    "/blog",
  ];

  const calculators = [
    "/ferramentas/calculadora-frete",
    "/ferramentas/calculadora-frete-km",
    "/ferramentas/calculadora-lucro-frete",
    "/ferramentas/calculadora-diesel",
    "/ferramentas/calculadora-pedagio",
    "/ferramentas/calculadora-cubagem",
    "/ferramentas/calculadora-peso-cubado",
    "/ferramentas/calculadora-custo-operacional",
    "/ferramentas/calculadora-antt",
    "/ferramentas/simulador-frete",
    "/ferramentas/conversor-peso-volume",
    "/ferramentas/planejador-viagem",
    "/ferramentas/calculadora-margem-lucro",
    "/ferramentas/calculadora-ocupacao-carga",
    "/ferramentas/calculadora-consumo-combustivel",
    "/ferramentas/calculadora-hora-parada",
    "/ferramentas/tabela-fipe-caminhoes",
    "/ferramentas/calculadora-custo-pneu",
  ];

  let blogRoutes: string[] = [];
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true },
    });
    blogRoutes = articles.map((art: { slug: string }) => `/blog/${art.slug}`);
  } catch (error) {
    console.warn("Database connection warning in sitemap generator:", error);
  }

  const allPages = [...staticPages, ...calculators, ...blogRoutes];

  return allPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/ferramentas") ? 0.9 : 0.5,
  }));
}
