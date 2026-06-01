import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import FreteKmCalculator from "@/components/calculators/FreteKmCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Frete por KM: Calculadora de Frete por Quilômetro | FreteLab",
  description:
    "Use a calculadora de frete por km do FreteLab para avaliar a rentabilidade da sua viagem de caminhão. Descubra o valor pago por quilômetro rodado com facilidade.",
  alternates: {
    canonical: "/ferramentas/calculadora-frete-km",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Como funciona o cálculo de frete por quilômetro?",
      answer:
        "O cálculo divide o valor total oferecido para a viagem pela quilometragem total a ser percorrida (ida e volta, se aplicável). O resultado é o valor em reais pago por quilômetro rodado (R$/km).",
    },
    {
      question: "Qual o valor mínimo recomendado de frete por KM?",
      answer:
        "Isso depende do tipo do veículo e da carga, mas geralmente deve cobrir no mínimo o custo operacional do caminhão (ex: R$ 2,50/km) mais a margem de lucro. Recomenda-se valores superiores a R$ 3,50/km para veículos truck pesados.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Frete por KM", item: "/ferramentas/calculadora-frete-km" },
        ]}
      />
      <CalculatorLayout
        title="Frete por KM: Calculadora de Frete por Quilômetro"
        description="Avalie propostas de frete descobrindo o valor exato pago por quilômetro rodado. Essencial para verificar a rentabilidade da viagem antes de aceitar a carga."
        faqSection={<FAQAccordion items={faqItems} id="frete-km" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Analisar uma Proposta de Frete por KM</h2>
            <p>
              Muitas vezes, as empresas oferecem um valor fechado pelo frete de longa distância que parece atrativo,
              mas ao dividir pela quilometragem rodada, o caminhoneiro percebe que a margem de ganho é quase nula.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Por que calcular o frete por KM?</h3>
            <p>
              Ao conhecer o custo por km do seu próprio caminhão (obtido na nossa Calculadora de Custo Operacional),
              você pode comparar diretamente com o valor oferecido. Se o seu custo por km for de R$ 2,30 e a proposta pagar
              R$ 2,10/km, você estará pagando para trabalhar.
            </p>
            <p>Use esta calculadora sempre que receber ofertas em painéis de carga para negociar valores justos.</p>
          </div>
        }
      >
        <FreteKmCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000002" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

