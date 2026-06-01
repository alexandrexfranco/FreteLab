import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import DieselCalculator from "@/components/calculators/DieselCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora Diesel Viagem: Consumo e Custos | FreteLab",
  description:
    "Use a calculadora diesel viagem para estimar o consumo de combustível por km e planejar os gastos de abastecimento de seu caminhão de forma rápida.",
  alternates: {
    canonical: "/ferramentas/calculadora-diesel",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Como calcular a quantidade de diesel para uma viagem?",
      answer:
        "Divida a distância total da rota (em quilômetros) pelo consumo médio do caminhão (em km por litro). Por exemplo: uma viagem de 600 km em um caminhão que faz 2,5 km/l consome 240 litros de diesel.",
    },
    {
      question: "Como o preço do diesel impacta o lucro do frete?",
      answer:
        "O combustível costuma representar entre 40% e 60% dos custos variáveis de uma viagem de transporte rodoviário. Pequenas variações no preço do diesel afetam diretamente as margens de lucro dos autônomos.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Diesel", item: "/ferramentas/calculadora-diesel" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora Diesel Viagem: Consumo e Custos"
        description="Planeje os custos de combustível da sua viagem informando a distância, a média de consumo do veículo e o preço atual por litro de óleo diesel."
        faqSection={<FAQAccordion items={faqItems} id="diesel" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Estimar Custos com Diesel e Otimizar o Abastecimento</h2>
            <p>
              O óleo diesel é a maior despesa operacional de qualquer caminhoneiro ou transportador. Controlar a média de
              consumo e projetar as despesas antes de iniciar a viagem é vital para manter as contas no azul.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Dicas para Economizar Diesel na Rota</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mantenha a calibragem dos pneus em dia para diminuir a resistência de rolagem.</li>
              <li>Evite acelerações bruscas e reduções desnecessárias; utilize a inércia do veículo.</li>
              <li>Respeite os limites de velocidade da via para reduzir o arrasto aerodinâmico do baú.</li>
              <li>Faça revisões preventivas nos filtros de ar e combustível.</li>
            </ul>
            <p>Use nossa ferramenta para simular rotas longas e planejar o caixa do frete com segurança.</p>
          </div>
        }
      >
        <DieselCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000004" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

