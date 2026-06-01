import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import LucroFreteCalculator from "@/components/calculators/LucroFreteCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Lucro do Frete: Frete Vale a Pena? Calculadora de Lucro | FreteLab",
  description:
    "Descubra se o frete vale a pena e calcule o lucro do frete real de forma rápida. Deduza comissões, diesel, pedágio e saiba quanto sobra no bolso.",
  alternates: {
    canonical: "/ferramentas/calculadora-lucro-frete",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que é lucro líquido no frete rodoviário?",
      answer:
        "O lucro líquido é o valor restante após deduzir todas as despesas operacionais da viagem (diesel, pedágio, alimentação, comissões de agenciamento) do valor bruto recebido.",
    },
    {
      question: "Qual é uma boa margem de lucro para transportes?",
      answer:
        "Para motoristas autônomos, uma boa margem de lucro líquido situa-se acima de 25% a 30%. Margens abaixo de 15% representam alto risco operacional caso ocorram imprevistos como quebras mecânicas.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Lucro do Frete", item: "/ferramentas/calculadora-lucro-frete" },
        ]}
      />
      <CalculatorLayout
        title="Lucro do Frete: Frete Vale a Pena? Calculadora de Lucro"
        description="Saiba exatamente quanto sobra de lucro líquido após pagar todas as despesas de uma viagem, ajudando no controle financeiro e planejamento familiar."
        faqSection={<FAQAccordion items={faqItems} id="lucro-frete" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Entendendo a Diferença entre Faturamento e Lucro</h2>
            <p>
              Muitos transportadores confundem o valor bruto recebido pelo frete com o ganho real. É comum aceitar fretes
              com valores nominais altos que, no entanto, demandam altos custos de combustível e pedágios, gerando prejuízos ocultos.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Como Calcular seu Lucro Líquido</h3>
            <p>A conta é simples, mas exige disciplina para registrar todos os custos:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Anote o valor bruto total do contrato de frete.</li>
              <li>Subtraia a despesa de óleo diesel (a maior variável da estrada).</li>
              <li>Deduza o custo de pedágios (se não tiver sido pago antecipadamente pelo embarcador).</li>
              <li>Deduza outras despesas, como taxas de carga/descarga, comissões de chapa e alimentação.</li>
            </ol>
            <p>
              O que restar é o seu lucro real. Use nosso simulador para analisar propostas e classificar a lucratividade
              da viagem antes de dar partida no motor.
            </p>
          </div>
        }
      >
        <LucroFreteCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000003" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

