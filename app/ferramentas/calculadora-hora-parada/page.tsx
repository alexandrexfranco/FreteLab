import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import HoraParadaCalculator from "@/components/calculators/HoraParadaCalculator";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Calculadora de Hora Parada: Estadia da Lei 11.442 | FreteLab",
  description:
    "Calcule o valor da estadia e hora parada de caminhão conforme a Lei nº 11.442. Veja quando começa a cobrar e simule o valor por tonelada/hora atualizado.",
  alternates: {
    canonical: "/ferramentas/calculadora-hora-parada",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "A partir de quantas horas o motorista começa a receber pela hora parada?",
      answer:
        "O transportador começa a receber a partir da 5ª hora de espera. As primeiras 5 horas de permanência no local de carga ou descarga são consideradas franquia legal de tolerância e não geram remuneração.",
    },
    {
      question: "Qual é o valor da hora parada de caminhão por lei?",
      answer:
        "O valor de referência estabelecido na Lei nº 11.442 é reajustado anualmente pelo INPC acumulado. Em 2026, o valor de lei é de R$ 2,50 por tonelada/hora de capacidade total de carga do veículo. O cálculo deve ser feito proporcionalmente sobre a capacidade total do caminhão, mesmo que a carga transportada seja menor.",
    },
    {
      question: "Como o transportador deve comprovar o horário de chegada ao destino?",
      answer:
        "A comprovação é feita através de qualquer documento que ateste de forma clara o momento da chegada e apresentação do caminhão na empresa. Podem ser utilizados canhotos das Notas Fiscais com registro manual ou carimbo de data e hora, tickets de pesagem da balança, registros informatizados de controle de portaria ou notificações eletrônicas.",
    },
    {
      question: "O cálculo da estadia baseia-se na carga real ou na capacidade do caminhão?",
      answer:
        "O cálculo é feito obrigatoriamente com base na capacidade máxima de carga útil do veículo (em toneladas), e não sobre o peso líquido da mercadoria que está sendo transportada, conforme determina expressamente o Artigo 11 da Lei nº 11.442.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Calculadora de Hora Parada", item: "/ferramentas/calculadora-hora-parada" },
        ]}
      />
      <CalculatorLayout
        title="Calculadora de Hora Parada: Valor de Estadia"
        description="Calcule facilmente o valor da indenização devida por atrasos no carregamento ou descarregamento do caminhão, de acordo com o limite de 5 horas e regras da Lei nº 11.442."
        faqSection={<FAQAccordion items={faqItems} id="hora-parada" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Como funciona a Lei da Hora Parada (Lei 11.442/2007)</h2>
            <p>
              A lei de hora parada (estadia) protege os caminhoneiros autônomos (TAC) e as empresas de transporte de cargas (ETC) contra a retenção indevida dos veículos nos pátios das empresas contratantes ou destinatárias das mercadorias.
            </p>
            <p>
              Segundo o <strong>Artigo 11, § 5º da Lei nº 11.442/2007</strong>, o prazo máximo para carga e descarga do veículo é de <strong>5 horas</strong>, contadas a partir da chegada do caminhão ao local de destino.
            </p>

            <h3 className="text-xl font-bold text-slate-800">O que acontece após as 5 horas de tolerância?</h3>
            <p>
              Caso a operação de carregamento ou descarregamento ultrapasse o limite de 5 horas, o contratante do frete ou o destinatário da mercadoria fica obrigado a pagar uma indenização por cada hora excedente (ou fração de hora) de permanência do caminhão.
            </p>
            <p>
              Essa indenização é calculada com base na <strong>capacidade total de carga do veículo (em toneladas)</strong> multiplicada pelo valor hora estipulado.
            </p>

            <h3 className="text-xl font-bold text-slate-800">Fórmula de Cálculo da Estadia</h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-700 space-y-2">
              <p>1. Tempo de Espera = (Hora Início Descarga) - (Hora Chegada)</p>
              <p>2. Horas Excedentes = Máximo(0, Tempo de Espera - 5 horas)</p>
              <p>3. Valor Total = Horas Excedentes × Capacidade do Veículo (ton.) × R$ 2,50</p>
            </div>

            <h3 className="text-xl font-bold text-slate-800">Importância de Registrar o Horário de Chegada</h3>
            <p>
              Para assegurar o direito à indenização por hora parada, é fundamental que o motorista faça constar o horário de sua chegada no documento de frete ou portaria.
            </p>
            <p>
              De acordo com a legislação, o embarcador e o destinatário são obrigados a fornecer um documento que comprove o horário de entrada e saída do veículo em suas dependências. Sem essa comprovação, torna-se muito mais difícil cobrar os valores devidos em caso de litígio.
            </p>
          </div>
        }
      >
        <HoraParadaCalculator />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000016" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}
