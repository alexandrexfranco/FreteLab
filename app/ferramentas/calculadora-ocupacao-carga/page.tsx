import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import OcupacaoCargaCalculator from "@/components/calculators/OcupacaoCargaCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Ocupação de Carga: Aproveitamento de Espaço | FreteLab",
  description:
    "Calcule a eficiência de ocupação volumétrica (m³) e peso (kg) do seu caminhão. Evite rodar com espaço ocioso ou excesso de peso.",
  alternates: {
    canonical: "/ferramentas/calculadora-ocupacao-carga",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que é eficiência de ocupação de carga?",
      answer:
        "É a porcentagem que indica o quanto da capacidade física útil do caminhão (tanto em volume quanto em peso de lotação) está sendo preenchida com a mercadoria a ser transportada.",
    },
    {
      question: "Por que evitar a ociosidade do veículo no transporte?",
      answer:
        "Veículos circulando com baixa ocupação volumétrica ou peso inferior ao limite faturam menos e aumentam o custo operacional unitário por tonelada transportada, gerando ineficiência logística.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Ocupação de Carga", item: "/ferramentas/calculadora-ocupacao-carga" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Ocupação de Carga"
        description="Calcule a eficiência operacional de aproveitamento do espaço interno do baú ou carroceria do caminhão de acordo com as capacidades nominais."
        faqSection={<FAQAccordion items={faqItems} id="ocupacao-carga" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Otimizar a Capacidade de Carga do Veículo</h2>
            <p>
              O planejamento logístico moderno foca em maximizar a ocupação dos veículos para ratear o custo fixo do frete.
              Consolidar mercadorias com perfis de densidade complementares (leves/volumosas e densas/pesadas) é o segredo
              para atingir 100% de aproveitamento.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Aproveitando Peso e Volume</h3>
            <p>
              Muitas cargas atingem o limite de volume do veículo (cubagem) antes de atingir o limite de peso de balança.
              Identificar essa relação ajuda o frotista a escolher o caminhão ideal (ex: VUC, Truck, Carreta) para cada perfil de rota.
            </p>
            <p>Monitore a eficiência e simule o aproveitamento físico de sua frota com nossa ferramenta.</p>
          </div>
        }
      >
        <OcupacaoCargaCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000014" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

