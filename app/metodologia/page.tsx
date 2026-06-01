import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";

export const metadata: Metadata = {
  title: "Metodologia de Cálculo e Fórmulas | FreteLab",
  description:
    "Entenda a metodologia matemática, referências técnicas e tabelas regulamentadas que embasam as calculadoras do FreteLab.",
  alternates: {
    canonical: "/metodologia",
  },
};

export default function Page() {
  return (
    <>
      <SEOBreadcrumb items={[{ name: "Metodologia", item: "/metodologia" }]} />
      <article className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-2xl border border-slate-200 shadow-sm prose prose-slate">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Metodologia e Fórmulas de Cálculo</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A transparência matemática é a base da confiabilidade das nossas ferramentas. Aqui você encontra as fórmulas
            utilizadas em nossos algoritmos e as fontes de dados oficiais que mantêm os resultados precisos.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Cálculo de Cubagem e Peso Cubado</h2>
          <p className="text-slate-600 leading-relaxed">
            Nossas calculadoras de cubagem comparam o peso volumétrico em relação ao peso físico real utilizando fatores regulados
            da IATA e ANTT:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>
              <strong>Fórmula do Volume:</strong> Largura (m) × Altura (m) × Comprimento (m) × Quantidade.
            </li>
            <li>
              <strong>Peso Cubado:</strong> Volume total (m³) × Fator de Cubagem.
            </li>
            <li>
              <strong>Fator de Cubagem Rodoviário Nacional:</strong> 300 kg/m³ (Padrão ANTT).
            </li>
            <li>
              <strong>Fator de Cubagem Aéreo Nacional:</strong> 167 kg/m³ (Padrão IATA).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Custos Operacionais por KM</h2>
          <p className="text-slate-600 leading-relaxed">
            O custo por km rodado baseia-se na separação estrita de despesas fixas (IPVA, seguros, depreciação acumulada, pessoal)
            e variáveis (combustível, pneus, manutenção mecânica):
          </p>
          <pre className="bg-slate-100 p-4 rounded-xl font-mono text-xs text-slate-800">
            Custo por KM = (Custos Fixos Mensais ÷ Km Rodados no Mês) + Custos Variáveis por KM
          </pre>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Tabela de Frete Mínimo ANTT</h2>
          <p className="text-slate-600 leading-relaxed">
            O motor de cálculo da calculadora ANTT simula os coeficientes definidos pela ANTT relativos às cargas. Os valores oficiais
            incluem:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Coeficiente de Deslocamento (CCD) - custo por quilômetro rodado.</li>
            <li>Coeficiente de Carga e Descarga (CC) - custo fixo de logística nas pontas da rota.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Fontes e Referências de Regulamentação</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>
              <a
                href="https://www.gov.br/antt/pt-br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Agência Nacional de Transportes Terrestres (ANTT)
              </a>
            </li>
            <li>
              <a
                href="https://www.gov.br/infraestrutura/pt-br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Ministério da Infraestrutura do Brasil (MInfra)
              </a>
            </li>
            <li>Fórmulas clássicas de Logística e Engenharia de Transportes de Cargas Terrestres.</li>
          </ul>
        </div>
      </article>
    </>
  );
}
