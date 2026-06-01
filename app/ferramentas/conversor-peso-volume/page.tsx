import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import ConversorPesoVolumeCalculator from "@/components/calculators/ConversorPesoVolumeCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Conversor de Peso x Volume: Cubagem Logística | FreteLab",
  description:
    "Converta peso em volume equivalente ou volume em peso cubado de maneira simples usando os fatores padrão de mercado para transporte.",
  alternates: {
    canonical: "/ferramentas/conversor-peso-volume",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Qual o fator padrão para conversão de peso e volume no frete?",
      answer:
        "O fator padrão é de 300 kg por metro cúbico (m³) para o transporte rodoviário nacional e 167 kg por metro cúbico para o transporte aéreo.",
    },
    {
      question: "Para que serve a conversão de peso x volume?",
      answer:
        "Serve para determinar o peso correspondente ao espaço físico ocupado por uma mercadoria. Isso ajuda a saber qual será a taxa cobrada pela transportadora (se o peso físico real ou o peso correspondente ao volume).",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Conversor de Peso x Volume", item: "/ferramentas/conversor-peso-volume" },
        ]}
      />
      <CalculatorLayout
        title="Conversor Peso x Volume"
        description="Realize conversões automáticas e equivalências entre peso bruto e volume volumétrico de acordo com fatores logísticos regulamentados."
        faqSection={<FAQAccordion items={faqItems} id="conversor-peso-volume" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Conversão de Medidas e Fatores de Cubagem Logísticos</h2>
            <p>
              Entender como o peso e o volume interagem é fundamental para fechar contratos logísticos vantajosos e evitar
              surpresas na hora da pesagem em balanças rodoviárias ou postos alfandegários.
            </p>
            <h3 className="text-xl font-bold text-slate-800">Equivalências de Cubagem</h3>
            <p>
              Em resumo, as transportadoras convertem metros cúbicos de carga em quilos equivalentes para garantir a estabilidade
              do frete. Isso garante que mercadorias leves mas com grandes dimensões ocupando todo o espaço físico do veículo
              sejam cobradas a um valor justo correspondente ao volume impedido de ser utilizado por outras cargas.
            </p>
            <p>Use este conversor para estimar o peso cubado rapidamente no pátio da empresa.</p>
          </div>
        }
      >
        <ConversorPesoVolumeCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000011" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

