import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import CustoOperacionalCalculator from "@/components/calculators/CustoOperacionalCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Custo por KM Caminhão: Custo Operacional de Caminhão | FreteLab",
  description:
    "Calcule o custo operacional de caminhão e saiba o custo por km do seu veículo. Planeje despesas com manutenção, pneus, IPVA e combustível.",
  alternates: {
    canonical: "/ferramentas/calculadora-custo-operacional",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que entra nos custos fixos de um caminhão?",
      answer:
        "Custos fixos são despesas que ocorrem independentemente do veículo estar rodando ou parado. Incluem IPVA, licenciamento, seguros obrigatórios e facultativos, depreciação do caminhão, salário do motorista e rastreamento.",
    },
    {
      question: "O que entra nos custos variáveis de transporte?",
      answer:
        "Custos variáveis ocorrem apenas quando o veículo se desloca. Incluem óleo diesel, Arla 32, lubrificantes, pneus, manutenção preventiva/corretiva e pedágios da viagem.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Custo Operacional", item: "/ferramentas/calculadora-custo-operacional" },
        ]}
      />
      <CalculatorLayout
        title="Custo por KM Caminhão: Custo Operacional de Caminhão"
        description="Planeje a saúde financeira de sua empresa de transportes ou veículo autônomo. Identifique o custo real por quilômetro rodado."
        faqSection={<FAQAccordion items={faqItems} id="custo-operacional" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como Gerenciar os Custos de Transporte Rodoviário</h2>
            <p>
              Muitos proprietários de caminhão e pequenas transportadoras entram em colapso financeiro por não controlarem a
              depreciação e os custos de manutenção preventiva do caminhão. Calcular apenas o custo do diesel é insuficiente.
            </p>
            <h3 className="text-xl font-bold text-slate-800">A Fórmula de Rateio por KM</h3>
            <p>
              Para encontrar o custo real por quilômetro, somamos o custo fixo mensal (ex: R$ 4.000) rateado pela média de km
              rodados no mês (ex: 8.000 km, resultando em R$ 0,50/km) e somamos com o custo variável por km (diesel + manutenção, ex: R$ 1,80/km).
              O custo total será de R$ 2,30/km.
            </p>
            <p>Utilize esta ferramenta para identificar gargalos operacionais e ajustar seus preços de venda de frete.</p>
          </div>
        }
      >
        <CustoOperacionalCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000008" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

