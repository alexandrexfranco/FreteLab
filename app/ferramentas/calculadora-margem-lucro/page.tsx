import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import MargemLucroCalculator from "@/components/calculators/MargemLucroCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Margem de Lucro do Frete | FreteLab",
  description:
    "Calcule a margem de lucro líquido e o markup do seu serviço de transporte rodoviário. Descubra a rentabilidade percentual das suas operações.",
  alternates: {
    canonical: "/ferramentas/calculadora-margem-lucro",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Qual a diferença entre margem de lucro e markup?",
      answer:
        "A margem de lucro é calculada sobre o preço de venda final do serviço (indica quanto da receita sobrou em lucro). O markup é calculado sobre o custo operacional inicial do serviço (indica o quanto o preço cobrado está acima do custo).",
    },
    {
      question: "Qual margem de lucro líquida ideal para pequenas transportadoras?",
      answer:
        "O ideal é que a margem líquida da empresa fique entre 15% e 25% após o desconto de custos de combustível, motoristas, impostos federais/estaduais e depreciação dos veículos.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Margem de Lucro", item: "/ferramentas/calculadora-margem-lucro" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Margem de Lucro"
        description="Identifique a rentabilidade percentual real de suas ofertas e serviços comparando os custos operacionais com a receita gerada."
        faqSection={<FAQAccordion items={faqItems} id="margem-lucro" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Medir a Saúde Financeira do seu Transporte de Carga</h2>
            <p>
              Muitos prestadores de serviço focam apenas no ganho bruto nominal das propostas de frete. No entanto, o fator
              fundamental para a sustentabilidade do negócio de transporte é a margem líquida percentual obtida.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Fórmulas Financeiras de Rentabilidade</h3>
            <p>Os principais indicadores do seu lucro são obtidos por:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Lucro Bruto:</strong> Preço do Frete Recebido - Custo Operacional.
              </li>
              <li>
                <strong>Margem de Lucro:</strong> (Lucro Bruto ÷ Preço do Frete) × 100.
              </li>
              <li>
                <strong>Markup:</strong> (Lucro Bruto ÷ Custo Operacional) × 100.
              </li>
            </ul>
            <p>Aplique e simule suas taxas percentuais para balizar suas propostas comerciais com precisão.</p>
          </div>
        }
      >
        <MargemLucroCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000013" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

