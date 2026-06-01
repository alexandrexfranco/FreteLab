import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import CubagemCalculator from "@/components/calculators/CubagemCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Cubagem Online: Como Calcular m³ de Carga | FreteLab",
  description:
    "Calcule a cubagem e o volume em metros cúbicos (m³) das suas mercadorias de forma simples. Entenda o fator de cubagem rodoviário e aéreo.",
  alternates: {
    canonical: "/ferramentas/calculadora-cubagem",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que é cubagem logística e para que serve?",
      answer:
        "A cubagem é a relação entre o peso físico da carga e o volume ocupado por ela no veículo de transporte. Serve para garantir que o caminhão aproveite ao máximo seu espaço de capacidade física e peso limite.",
    },
    {
      question: "Como funciona a fórmula de cubagem rodoviária?",
      answer:
        "A fórmula consiste em multiplicar: Comprimento × Largura × Altura × Quantidade × Fator de Cubagem. No transporte rodoviário geral do Brasil, o fator de cubagem de referência é 300.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Cubagem", item: "/ferramentas/calculadora-cubagem" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Cubagem Online"
        description="Calcule metros cúbicos (m³) e peso cubado de caixas e paletes para transportes de cargas terrestres, aéreas ou marítimas."
        faqSection={<FAQAccordion items={faqItems} id="cubagem" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">O que é Cubagem na Logística e Como Funciona</h2>
            <p>
              Imagine transportar 500 kg de travesseiros de penas contra 500 kg de chapas de aço. Os travesseiros ocuparão
              todo o baú do caminhão, impedindo o embarque de outras cargas, embora estejam longe de atingir a capacidade de
              peso limite. A chapa de aço ocupará pouco espaço físico, mas atingirá rapidamente o peso limite.
            </p>
            <h3 className="text-xl font-bold text-slate-800">A Importância do Fator de Cubagem</h3>
            <p>
              Para equilibrar essa diferença física de peso e espaço, a cubagem calcula um peso fictício com base no volume
              ocupado. O fator de cubagem rodoviário padrão é 300 kg por metro cúbico.
            </p>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs text-slate-800">
              Peso Cubado = Largura (m) × Altura (m) × Comprimento (m) × Quantidade × 300
            </div>
            <p>
              Se o peso cubado for maior que o peso real da carga, as transportadoras utilizam o peso cubado como base
              para cobrança do frete (peso taxável), otimizando o faturamento do veículo.
            </p>
          </div>
        }
      >
        <CubagemCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000006" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

