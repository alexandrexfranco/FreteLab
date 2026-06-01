import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import PlanejadorViagemCalculator from "@/components/calculators/PlanejadorViagemCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Custo de Viagem de Caminhão: Planejador de Rota | FreteLab",
  description:
    "Calcule o custo de viagem de caminhão de forma completa. Estime gastos com diesel, combustível por km, pedágio e despesas gerais da rota.",
  alternates: {
    canonical: "/ferramentas/planejador-viagem",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Como estimar os custos pessoais durante uma viagem de frete?",
      answer:
        "Multiplique os dias de viagem previstos pela média diária de alimentação e hospedagem. Recomenda-se adicionar uma taxa de 10% a 15% para imprevistos mecânicos e despesas extras na estrada.",
    },
    {
      question: "Qual o benefício de planejar os custos por KM de uma rota?",
      answer:
        "O planejamento permite comparar o custo operacional real de deslocamento com a receita do frete, garantindo que o motorista identifique antecipadamente se a rota gerará lucro líquido.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Planejador de Viagem", item: "/ferramentas/planejador-viagem" },
        ]}
      />
      <CalculatorLayout
        title="Custo de Viagem de Caminhão: Planejador de Rota"
        description="Construa o orçamento operacional completo da sua próxima viagem rodoviária estimando custos com combustível, tarifas de pedágio e despesas de permanência."
        faqSection={<FAQAccordion items={faqItems} id="planejador-viagem" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Planejamento Financeiro de Rota para Transportes</h2>
            <p>
              O sucesso do caminhoneiro autônomo e de pequenas transportadoras está na capacidade de planejar o caixa antes de
              dar partida na viagem. Muitas vezes, o valor bruto do frete aparenta cobrir os custos operacionais, mas as despesas
              pessoais de alimentação e hospedagem corroem a lucratividade total da rota.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Passos para um Planejamento Saudável</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Defina a rota exata e descubra a quilometragem total.</li>
              <li>Calcule a média de consumo do caminhão (km/l) e multiplique pela distância total para estimar o consumo de diesel.</li>
              <li>Preveja a quantidade de dias da rota para estimar as despesas com alimentação e pernoites.</li>
              <li>Consulte o valor de pedágios para a categoria do seu caminhão.</li>
            </ol>
            <p>Simule seus gastos com facilidade usando nossa ferramenta inteligente e viaje seguro.</p>
          </div>
        }
      >
        <PlanejadorViagemCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000012" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

