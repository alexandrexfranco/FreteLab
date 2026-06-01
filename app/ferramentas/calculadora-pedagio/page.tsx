import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import PedagioCalculator from "@/components/calculators/PedagioCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Pedágio: Custos de Pedágio por Eixo | FreteLab",
  description:
    "Estime as tarifas de pedágio ao longo da sua rota rodoviária. Calcule os custos proporcionais de acordo com o número de eixos do seu caminhão.",
  alternates: {
    canonical: "/ferramentas/calculadora-pedagio",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "Quem é responsável pelo pagamento do pedágio no frete?",
      answer:
        "Segundo a Lei nº 10.209/2001 (Lei do Vale-Pedágio obrigatório), o embarcador (dono da carga) é o responsável pelo pagamento antecipado do pedágio, não podendo descontar o valor do valor do frete pago ao motorista.",
    },
    {
      question: "Como o número de eixos influencia a tarifa de pedágio?",
      answer:
        "As tarifas de pedágio no Brasil cobram valores proporcionais ao número de eixos comerciais do veículo. Eixos suspensos (sem contato com a via) são isentos de tarifa quando o veículo trafega vazio (conforme a Lei dos Caminhoneiros).",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Pedágio", item: "/ferramentas/calculadora-pedagio" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Pedágio por Eixo"
        description="Estime os custos agregados de pedágio da sua viagem rodoviária de acordo com a quantidade de eixos do caminhão e o número de praças no caminho."
        faqSection={<FAQAccordion items={faqItems} id="pedagio" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">A Importância do Vale-Pedágio para Caminhoneiros</h2>
            <p>
              O pedágio representa uma despesa significativa no transporte de cargas brasileiro, devido à grande malha
              concedida à iniciativa privada. Conhecer a legislação do vale-pedágio evita abusos e garante o cumprimento
              dos direitos dos motoristas.
            </p>
            <h3 className="text-xl font-bold text-slate-800">O que diz a Lei do Vale-Pedágio?</h3>
            <p>
              A lei proíbe expressamente que o valor das tarifas seja embutido no frete. O embarcador deve fornecer o
              vale-pedágio em meio eletrônico (como cartões ou tags de pedágio) separado do pagamento do frete, sob pena de
              multa administrativa equivalente ao dobro do valor do frete contratado.
            </p>
            <p>Monitore suas despesas e simule despesas médias de pedágio com nossa calculadora rápida.</p>
          </div>
        }
      >
        <PedagioCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000005" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}

