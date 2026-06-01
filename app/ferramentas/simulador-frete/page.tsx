import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import SimuladorFreteCalculator from "@/components/calculators/SimuladorFreteCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Simulador de Frete: Orçamento de Carga e Transporte | FreteLab",
  description:
    "Use o simulador de frete online do FreteLab para calcular propostas com frete peso, ad valorem, GRIS e alíquota de ICMS para o transporte rodoviário.",
  alternates: {
    canonical: "/ferramentas/simulador-frete",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que é o Ad Valorem no cálculo do frete?",
      answer:
        "O Ad Valorem (ou Frete Valor) é a taxa cobrada pela transportadora para cobrir os custos de seguro de carga (RCF-DC) durante o deslocamento. É calculado como uma porcentagem sobre o valor total da nota fiscal da mercadoria.",
    },
    {
      question: "O que é o GRIS na fatura de transporte?",
      answer:
        "O GRIS (Gerenciamento de Risco) é a taxa cobrada para cobrir medidas de prevenção de roubos e sinistros de carga, como escoltas, monitoramentos, travas de segurança e softwares de rastreamento.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Simulador de Frete", item: "/ferramentas/simulador-frete" },
        ]}
      />
      <CalculatorLayout
        title="Simulador de Frete: Orçamento de Carga e Transporte"
        description="Gere orçamentos e simulações detalhadas contendo a distribuição clássica de despesas como frete peso, seguros e impostos estaduais."
        faqSection={<FAQAccordion items={faqItems} id="simulador-frete" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como é Composta uma Fatura de Frete Industrial</h2>
            <p>
              As transportadoras de carga fracionada ou lotação utilizam tabelas complexas de cobrança. Diferente do frete autônomo,
              o frete corporativo inclui diversas tarifas operacionais e tributos regulamentados.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Compostos do Frete Corporativo</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Frete Peso:</strong> Custo do transporte em si baseado no peso real ou cubado da carga.
              </li>
              <li>
                <strong>Ad Valorem:</strong> Seguro cobrado de acordo com o risco de acidentes e valor da mercadoria.
              </li>
              <li>
                <strong>GRIS:</strong> Taxa operacional de proteção contra roubos nas estradas brasileiras.
              </li>
              <li>
                <strong>ICMS:</strong> Imposto sobre Circulação de Mercadorias e Serviços, que varia por estado (ex: 12% ou 18%).
              </li>
            </ul>
            <p>Simule e orce suas tarifas de maneira simples com o nosso simulador.</p>
          </div>
        }
      >
        <SimuladorFreteCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000010" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

