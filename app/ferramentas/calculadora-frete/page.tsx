import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import FreteCalculator from "@/components/calculators/FreteCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Frete: Calcular Frete de Caminhão | FreteLab",
  description:
    "Use a calculadora de frete online do FreteLab para calcular frete de caminhão com base em quilometragem, diesel, pedágio e margem de lucro desejada.",
  alternates: {
    canonical: "/ferramentas/calculadora-frete",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Como calcular frete rodoviário de cargas?",
      answer:
        "Para calcular o frete rodoviário, multiplique a distância total da rota pelo custo operacional por quilômetro rodado do veículo. Adicione despesas acessórias como pedágios, ajudantes e impostos. Por fim, adicione a margem de lucro desejada sobre a soma total.",
    },
    {
      question: "Qual o custo médio por quilômetro de um caminhão truck?",
      answer:
        "O custo médio por quilômetro varia entre R$ 2,20 e R$ 3,80 dependendo do tipo do veículo, preço do diesel, desgaste de pneus e custos fixos (IPVA, seguro e rastreamento).",
    },
    {
      question: "Como funciona a calculadora de frete do FreteLab?",
      answer:
        "Nossa calculadora automatiza essa fórmula. Ela soma os custos de distância rodada e pedágio e aplica a porcentagem de margem de lucro sobre o total final para fornecer um preço de frete de venda ideal.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Frete", item: "/ferramentas/calculadora-frete" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Frete: Calcular Frete de Caminhão"
        description="Calcule o preço de venda de frete sugerido com base nos seus custos reais de combustível, manutenção, pedágio e margem de lucro operacional desejada."
        faqSection={<FAQAccordion items={faqItems} id="frete" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Calcular Frete de Carga com Precisão</h2>
            <p>
              Saber cobrar o frete correto é o principal fator de sucesso para caminhoneiros autônomos,
              frotistas e empresas de transporte. Uma precificação errada pode gerar prejuízos acumulados ao final do mês.
            </p>
            <h3 className="text-xl font-bold text-slate-800">A Fórmula do Frete</h3>
            <p>A matemática por trás do cálculo de frete é composta por:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Custo de Deslocamento:</strong> Distância da rota (km) multiplicada pelo custo operacional do veículo (R$/km).
              </li>
              <li>
                <strong>Despesas Acessórias:</strong> Pedágio (que por lei deve ser pago pelo embarcador) e outras taxas.
              </li>
              <li>
                <strong>Margem de Lucro:</strong> Porcentagem adicionada sobre o custo total para gerar o lucro líquido da viagem.
              </li>
            </ul>
            <div className="bg-slate-100 p-4 rounded-xl font-mono text-xs text-slate-800">
              Valor do Frete = (Distância × Custo por KM + Pedágios) ÷ (1 - Margem de Lucro / 100)
            </div>
            <p>
              Use esta calculadora diariamente para garantir que suas viagens cubram as depreciações do seu caminhão e tragam
              retorno financeiro justo.
            </p>
          </div>
        }
      >
        <FreteCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000001" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

