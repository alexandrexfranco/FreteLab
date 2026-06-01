import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";

export const metadata: Metadata = {
  title: "Quem Escreve e Revisa: Nossos Especialistas | FreteLab",
  description:
    "Conheça os profissionais por trás das ferramentas e do conteúdo técnico do FreteLab. Expertise em logística e transporte.",
  alternates: {
    canonical: "/autor",
  },
};

export default function Page() {
  return (
    <>
      <SEOBreadcrumb items={[
        { name: "Especialistas", item: "/autor" }
      ]} />
      <article className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
          <header className="border-b border-slate-100 pb-8 mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Quem escreve no FreteLab</h1>
            <p className="text-lg text-slate-500">
              Garantia de conteúdo técnico qualificado e fórmulas matematicamente verificadas para o mercado logístico.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="md:col-span-1 flex flex-col items-center">
              {/* Profile Avatar Placeholder (premium CSS styling) */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-md select-none mb-4">
                FL
              </div>
              <div className="text-center">
                <span className="font-bold text-slate-900 block">Equipe Editorial</span>
                <span className="text-xs text-slate-400">Logística e Tecnologia</span>
              </div>
            </div>

            <div className="md:col-span-3 prose prose-slate">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Equipe Técnica & Consultores Logísticos</h2>
              <p className="text-slate-600 leading-relaxed">
                Todo o conteúdo técnico, artigos e ferramentas operacionais disponíveis no <strong>FreteLab</strong> são
                criados, desenvolvidos e revisados por engenheiros mecânicos especializados em frotas, economistas do setor logístico
                e programadores com ampla bagagem no desenvolvimento de Sistemas de Gerenciamento de Transporte (TMS).
              </p>
              <p className="text-slate-600 leading-relaxed">
                Nosso compromisso é alinhar a teoria logística (cubagem, custos fixos e variáveis, depreciação acelerada de ativos)
                com a realidade prática enfrentada pelos motoristas autônomos e transportadoras no asfalto brasileiro.
              </p>
              
              <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">Revisão e Fontes</h3>
              <p className="text-slate-600 leading-relaxed">
                Nossas calculadoras baseiam-se em resoluções ativas do Ministério da Infraestrutura, agências reguladoras (ANTT)
                e órgãos federais. Realizamos revisões periódicas sempre que ocorrem alterações na tabela oficial de piso mínimo
                de frete ou flutuações estruturais nas alíquotas do ICMS interestadual.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
