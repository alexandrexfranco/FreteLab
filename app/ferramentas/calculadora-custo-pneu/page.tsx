import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import CustoPneuCalculator from "@/components/calculators/CustoPneuCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Custo de Pneu por KM (CPK) | FreteLab",
  description:
    "Calcule o custo por quilômetro rodado de pneus (CPK) e descubra a economia real das recapagens em seu caminhão ou frota.",
  alternates: {
    canonical: "/ferramentas/calculadora-custo-pneu",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que significa CPK de pneus?",
      answer:
        "CPK significa Custo por Quilômetro. É o índice financeiro mais importante para controle de pneus em frotas de transporte de cargas. Ele mede quanto o pneu gasta em reais por cada quilômetro rodado, facilitando a comparação de durabilidade e custo-benefício de diferentes marcas do mercado.",
    },
    {
      question: "Como é calculado o custo por quilômetro (CPK) do pneu?",
      answer:
        "O cálculo do CPK é feito dividindo-se o custo total investido no pneu (preço do pneu novo somado aos custos de cada recapagem realizada) pela quilometragem total que ele rodou ao longo de toda a sua vida útil (soma da quilometragem como novo e como recapado).",
    },
    {
      question: "Por que vale a pena fazer a recapagem (reforma) do pneu?",
      answer:
        "A recapagem é altamente lucrativa porque reaproveita a estrutura interna (carcaça) do pneu novo, que é a parte mais cara de sua fabricação. O custo de aplicar uma nova banda de rodagem (recapagem) costuma representar cerca de 25% do preço de um pneu novo, mas rende quase a mesma quilometragem, derrubando drasticamente o CPK Geral.",
    },
    {
      question: "Quantas recapagens um pneu de caminhão aguenta?",
      answer:
        "Geralmente, carcaças de pneus premium rodando em condições corretas de calibração, alinhamento e peso comportam de 2 a 3 recapagens (primeira, segunda e terceira vidas extras) com segurança, especialmente quando instalados nos eixos traseiros de tração ou eixos de implementos (carretas).",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Custo de Pneu", item: "/ferramentas/calculadora-custo-pneu" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Custo de Pneu por KM (CPK)"
        description="Gerencie os custos com pneus da sua frota ou caminhão autônomo. Mapeie o investimento, simule a quilometragem rodada e descubra a economia real de suas recapagens."
        faqSection={<FAQAccordion items={faqItems} id="custo-pneu" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como a Gestão de Pneus Impacta o Lucro do Frete</h2>
            <p>
              Depois do combustível (óleo diesel), os pneus representam o maior custo de manutenção de um caminhão rodoviário. Para um frotista ou motorista autônomo, não saber o custo por quilômetro rodado (CPK) de seus pneus significa perder o controle sobre a precificação correta de seus fretes.
            </p>
            <p>
              Com a nossa calculadora, você consegue simular o ciclo de vida completo de um pneu (desde a compra do pneu novo até a última recapagem), avaliando o retorno sobre o investimento (ROI) de cada reforma realizada.
            </p>

            <h3 className="text-xl font-bold text-slate-800">A Fórmula do CPK Geral do Pneu</h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-700 space-y-2">
              <p>1. Custo Total = Preço Pneu Novo + Custo Recapagem 1 + Custo Recapagem 2 + Custo Recapagem 3</p>
              <p>2. KM Total = KM Novo + KM Recapagem 1 + KM Recapagem 2 + KM Recapagem 3</p>
              <p>3. CPK Geral = Custo Total ÷ KM Total</p>
            </div>

            <h3 className="text-xl font-bold text-slate-800">Dicas Práticas para Reduzir o CPK na Estrada</h3>
            <p>
              Para maximizar a quilometragem total acumulada e extrair o melhor rendimento econômico por pneu, implemente os seguintes procedimentos básicos:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Calibração Semanal:</strong> Rodar com pneus murchos aumenta o desgaste das bordas da banda de rodagem, consome mais combustível e diminui a vida útil da carcaça para futuras recapagens.
              </li>
              <li>
                <strong>Alinhamento e Balanceamento:</strong> Realize serviços preventivos nos eixos dianteiro e traseiro a cada 10.000 km ou sempre que notar vibrações ou desgaste irregular.
              </li>
              <li>
                <strong>Rodízio Preventivo:</strong> Mude os pneus de posição periodicamente para balancear o desgaste que ocorre de formas diferentes em eixos direcionais, de tração e eixos livres da carreta.
              </li>
            </ul>
          </div>
        }
      >
        <CustoPneuCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000018" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}
