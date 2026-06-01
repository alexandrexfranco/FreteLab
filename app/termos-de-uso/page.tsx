import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";

export const metadata: Metadata = {
  title: "Termos de Uso | FreteLab",
  description:
    "Confira os termos e condições de uso do FreteLab. Aviso legal de isenção de responsabilidade sobre os cálculos estimados das ferramentas.",
  alternates: {
    canonical: "/termos-de-uso",
  },
};

export default function Page() {
  return (
    <>
      <SEOBreadcrumb items={[{ name: "Termos de Uso", item: "/termos-de-uso" }]} />
      <article className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-2xl border border-slate-200 shadow-sm prose prose-slate text-slate-600">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Termos de Uso</h1>
          <p>
            Ao acessar o <strong>FreteLab</strong>, você concorda em cumprir e estar vinculado aos seguintes termos e
            condições de uso de nossa plataforma.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Isenção de Responsabilidade Financeira</h2>
          <p className="font-semibold text-slate-900">
            Atenção: Os resultados fornecidos por nossas 15 calculadoras são estimativas matemáticas baseadas em médias
            de mercado, coeficientes gerais e informações inseridas pelo próprio usuário.
          </p>
          <p>
            O FreteLab não garante a exatidão absoluta das projeções de pedágio, combustível ou piso mínimo, e não se
            responsabiliza por quaisquer prejuízos decorrentes de fretes fechados com base nas simulações da plataforma. É dever do
            transportador auditar todas as variáveis antes de firmar contratos civis de frete.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Propriedade Intelectual</h2>
          <p>
            O layout do site, os códigos das calculadoras interativas, as logomarcas e o conteúdo editorial escrito são de propriedade
            do FreteLab. É proibida a reprodução automática por robôs (scraping) ou cópia integral sem citação de link do FreteLab.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Limitações de Acesso</h2>
          <p>
            Reservamo-nos o direito de restringir acessos de endereços IP que apresentem comportamentos suspeitos, ataques de negação
            de serviço (DDoS) ou tentativas de engenharia reversa de nossas APIs.
          </p>
        </div>
      </article>
    </>
  );
}
