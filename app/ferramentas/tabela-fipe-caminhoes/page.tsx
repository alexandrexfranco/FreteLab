import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";
import CalculatorLayout from "@/components/calculators/CalculatorLayout";
import TabelaFipeCaminhoes from "@/components/calculators/TabelaFipeCaminhoes";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

export const metadata: Metadata = {
  title: "Tabela FIPE Caminhões: Consulta de Preços de Usados | FreteLab",
  description:
    "Consulte o valor médio de caminhões novos e usados na Tabela FIPE oficial. Faça buscas por marca e modelo ou pelo código FIPE de 7 dígitos.",
  alternates: {
    canonical: "/ferramentas/tabela-fipe-caminhoes",
  },
};

export default function Page() {
  const faqItems = [
    {
      question: "O que é a Tabela FIPE e como ela é calculada?",
      answer:
        "A Tabela FIPE é o índice de preços de veículos novos e usados mais respeitado do Brasil, calculado mensalmente pela Fundação Instituto de Pesquisas Econômicas. A fundação realiza pesquisas de mercado coletando anúncios e preços reais de compra e venda de veículos em todo o território nacional, descartando valores discrepantes para chegar a uma média estatística confiável.",
    },
    {
      question: "O que é o código FIPE e onde encontrá-lo?",
      answer:
        "O código FIPE é uma numeração de 7 dígitos estruturada no formato XXXXXX-X (ex: 501034-9) que identifica de maneira exclusiva cada modelo e versão de caminhão cadastrado na tabela. Você pode encontrá-lo no documento do veículo (CRLV-e), na apólice do seguro, em portais de venda ou realizando a busca por marca e modelo em nossa ferramenta.",
    },
    {
      question: "Por que o preço real de venda pode ser diferente da FIPE?",
      answer:
        "A tabela FIPE serve como base média de mercado para veículos originais e em bom estado. O valor real de mercado pode variar devido a fatores como o estado mecânico e de conservação do caminhão, quilometragem acumulada, desgaste de pneus, região comercial do país e, principalmente, a presença de implementos específicos (como baú sider, caçamba basculante, guincho, tanque ou baú refrigerado), que são avaliados separadamente.",
    },
    {
      question: "Qual o mês de referência atual das consultas?",
      answer:
        "As consultas feitas em nossa ferramenta buscam em tempo real os dados da tabela de referência do mês corrente fornecida pela FIPE (atualizada sempre no primeiro dia útil de cada mês). O mês correspondente aparece diretamente na ficha técnica detalhada do veículo consultado.",
    },
  ];

  return (
    <>
      <SEOBreadcrumb
        items={[
          { name: "Ferramentas", item: "/ferramentas" },
          { name: "Tabela FIPE Caminhões", item: "/ferramentas/tabela-fipe-caminhoes" },
        ]}
      />
      <CalculatorLayout
        title="Tabela FIPE Caminhões: Consulta Oficial"
        description="Consulte instantaneamente o preço médio de caminhões, chassis e cavalos mecânicos novos e usados. Encontre valores por marca e modelo ou diretamente pelo código FIPE de 7 dígitos."
        faqSection={<FAQAccordion items={faqItems} id="tabela-fipe" />}
        seoContent={
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">A Importância da Tabela FIPE para Caminhões e Veículos Pesados</h2>
            <p>
              No mercado de transporte rodoviário de cargas, a Tabela FIPE é a principal ferramenta de referência para negociações comerciais de compra e venda de frotas e caminhões autônomos. Ela serve também como base contratual de referência para seguradoras pagarem indenizações em caso de roubo, furto ou colisão com perda total.
            </p>
            <p>
              Ao realizar a consulta do preço médio do veículo, motoristas e transportadores conseguem planejar de forma mais realista os custos de depreciação do caminhão (um fator crucial para o cálculo do custo por KM rodado) e avaliar a viabilidade de financiamentos.
            </p>

            <h3 className="text-xl font-bold text-slate-800">Como consultar a Tabela FIPE de forma assertiva</h3>
            <p>
              Nossa ferramenta oferece duas formas simples e gratuitas de descobrir o preço do veículo pesado:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong>Busca por Fabricante e Modelo:</strong> Ideal para quando você quer navegar pelas marcas (ex: Mercedes-Benz, Scania, Volvo, Ford, VW) e encontrar um caminhão específico navegando por sua lista de modelos e anos correspondentes.
              </li>
              <li>
                <strong>Busca por Código FIPE:</strong> O caminho mais rápido se você já tem em mãos o documento de licenciamento do veículo ou a apólice de seguro. Digitando o código de 7 dígitos (ex: 501034-9), o sistema busca diretamente o caminhão correspondente, listando apenas os anos disponíveis para aquele código.
              </li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800">Implementos e Carrocerias: O que a FIPE não calcula?</h3>
            <p>
              É importante lembrar que a Tabela FIPE avalia apenas o <strong>cavalo mecânico</strong> ou o <strong>chassi do caminhão com cabine</strong>.
            </p>
            <p>
              Implementos rodoviários como baús, carrocerias graneleiras, caçambas, sider ou carretas acopladas (semirreboques de 2 ou 3 eixos) possuem tabelas FIPE próprias ou são avaliados conforme o valor de mercado de implementos usados. Por isso, ao comprar ou vender um caminhão completo, some o valor do chassi/cabine obtido na tabela ao valor de mercado do implemento instalado.
            </p>
          </div>
        }
      >
        <TabelaFipeCaminhoes />
      </CalculatorLayout>
      <AdSenseBanner slot="1000000017" minHeight={250} className="max-w-7xl mx-auto px-4" />
    </>
  );
}
