import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import PesoCubadoCalculator from "@/components/calculators/PesoCubadoCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Peso Cubado: Peso Real x Volumétrico | FreteLab",
  description:
    "Descubra se sua carga deve ser cobrada pelo peso real ou peso cubado (taxável). Ferramenta para transportadores calcularem o frete correto.",
  alternates: {
    canonical: "/ferramentas/calculadora-peso-cubado",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que é peso cubado de uma mercadoria?",
      answer:
        "O peso cubado é uma medida que converte as dimensões físicas da mercadoria (comprimento, largura, altura) em peso equivalente de transporte, multiplicando o volume em metros cúbicos por um fator fixo (300 no rodoviário).",
    },
    {
      question: "O que é peso taxável no frete?",
      answer:
        "O peso taxável é o maior valor entre o peso bruto real da carga e o peso cubado calculado. É o peso oficial utilizado pela tabela de precificação da transportadora para calcular o frete peso.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Peso Cubado", item: "/ferramentas/calculadora-peso-cubado" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Peso Cubado"
        description="Compare as dimensões volumétricas da sua carga com o peso bruto real para descobrir qual medida é a base de cobrança ideal para seu frete."
        faqSection={<FAQAccordion items={faqItems} id="peso-cubado" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Peso Cubado x Peso Bruto: Qual Usar na Cobrança?</h2>
            <p>
              Em transportes e logística, as tarifas são calculadas a partir de tabelas que associam rotas, valor de carga
              e peso. Contudo, a densidade da mercadoria é decisiva para garantir que o caminhão não circule subfaturado.
            </p>
            <h3 className="text-xl font-bold text-slate-800">A Regra de Ouro da Cubagem</h3>
            <p>
              Tanto no transporte aéreo quanto rodoviário, adota-se a comparação: se a mercadoria é volumosa e leve (ex: caixas de isopor),
              o peso cubado será maior que o real, então cobra-se pelo peso cubado. Se a mercadoria é pesada e compacta (ex: bobinas de metal),
              o peso real supera o cubado, cobrando-se pelo peso real.
            </p>
            <p>Conheça essa lógica e otimize as negociações de valores logísticos utilizando nossa ferramenta gratuita.</p>
          </div>
        }
      >
        <PesoCubadoCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000007" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

