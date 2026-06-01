import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import AnttCalculator from "@/components/calculators/AnttCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora ANTT: Tabela de Piso Mínimo do Frete | FreteLab",
  description:
    "Calcule o piso mínimo de frete obrigatório determinado pela tabela oficial da ANTT. Evite multas e cobre o valor de lei no transporte rodoviário.",
  alternates: {
    canonical: "/ferramentas/calculadora-antt",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que é a tabela de frete da ANTT?",
      answer:
        "É a tabela oficial que define o piso mínimo de frete obrigatório para o transporte rodoviário de cargas no Brasil, criada pela Política Nacional de Pisos Mínimos do Transporte Rodoviário de Cargas (Lei nº 13.703/2018).",
    },
    {
      question: "Como é calculado o valor do frete ANTT?",
      answer:
        "O cálculo baseia-se no número de eixos do caminhão, na distância percorrida da rota e no tipo de carga transportada, somando o coeficiente de custo de deslocamento e o coeficiente de custo de carga e descarga.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora ANTT", item: "/ferramentas/calculadora-antt" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora ANTT: Piso Mínimo"
        description="Consulte e estime os valores de frete mínimos vigentes determinados pelas resoluções de trânsito e transporte de cargas da ANTT."
        faqSection={<FAQAccordion items={faqItems} id="antt" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Funciona a Política de Piso Mínimo da ANTT</h2>
            <p>
              A Tabela de Frete ANTT foi instituída com o objetivo de garantir uma remuneração mínima digna aos caminhoneiros,
              cobrindo os custos essenciais da viagem para evitar que fretes sejam contratados abaixo do custo de subsistência.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Quem deve seguir a tabela ANTT?</h3>
            <p>
              O cumprimento do piso mínimo é obrigatório para todos os embarcadores, transportadores e cooperativas. O não
              pagamento dos valores mínimos sujeita o contratante a multas e obriga ao pagamento de indenização de até duas
              vezes o valor do frete contratado irregularmente.
            </p>
            <p>Nossa calculadora automatiza os coeficientes básicos vigentes para consulta rápida na rodovia.</p>
          </div>
        }
      >
        <AnttCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000009" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

