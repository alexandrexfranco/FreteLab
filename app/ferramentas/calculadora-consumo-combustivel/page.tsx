import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import ConsumoCombustivelCalculator from "@/components/calculators/ConsumoCombustivelCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Consumo de Combustível: Média KM/L | FreteLab",
  description:
    "Descubra a média de consumo de combustível do seu caminhão (km/l) e estime o custo exato por quilômetro rodado. Controle seus gastos de viagem.",
  alternates: {
    canonical: "/ferramentas/calculadora-consumo-combustivel",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Como calcular a média de consumo de combustível (km/l)?",
      answer:
        "Divida a quilometragem rodada entre dois abastecimentos pela quantidade de litros necessários para completar o tanque. Exemplo: se rodou 450 km e completou com 150 litros, a média é de 3 km/l.",
    },
    {
      question: "O que aumenta o consumo de combustível de caminhões?",
      answer:
        "Fatores como excesso de velocidade, acelerações bruscas, pneus murchos, sobrecarga de carga e filtros obstruídos aumentam significativamente o consumo médio do veículo.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Consumo de Combustível", item: "/ferramentas/calculadora-consumo-combustivel" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Consumo de Combustível"
        description="Acompanhe a eficiência do seu caminhão ou frota. Monitore as médias de quilômetros rodados por litro e o custo de combustível equivalente por quilômetro."
        faqSection={<FAQAccordion items={faqItems} id="consumo-combustivel" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Monitorar e Otimizar o Consumo Médio do Caminhão</h2>
            <p>
              O controle rígido do consumo de combustível é a linha tênue entre o lucro e o prejuízo no frete rodoviário de cargas.
              Pequenos desvios na média (ex: cair de 2,6 km/l para 2,3 km/l) representam milhares de reais perdidos ao ano.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Boas Práticas de Abastecimento</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Abasteça Sempre no Mesmo Nível:</strong> Complete o tanque na mesma posição da bomba para evitar variações
                na contagem de litros.
              </li>
              <li>
                <strong>Monitore Pressão dos Pneus:</strong> A pressão abaixo do ideal gera maior atrito e aumenta as despesas em até 5%.
              </li>
              <li>
                <strong>Evite Marcha Lenta Prolongada:</strong> Manter o motor ligado com o veículo parado consome combustível
                inutilmente e prejudica os bicos injetores.
              </li>
            </ul>
            <p>Monitore suas despesas e simule a média de rodagem com nossa ferramenta dinâmica e gratuita.</p>
          </div>
        }
      >
        <ConsumoCombustivelCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000015" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

