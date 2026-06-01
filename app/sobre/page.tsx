import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";

export const metadata: Metadata = {
  title: "Quem Somos | FreteLab",
  description:
    "Conheça a missão do FreteLab: simplificar o dia a dia do setor logístico e de transportes rodoviários por meio de calculadoras gratuitas e conteúdo técnico.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function Page() {
  return (
    <>
      <SEOBreadcrumb items={[{ name: "Sobre Nós", item: "/sobre" }]} />
      <article className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-2xl border border-slate-200 shadow-sm prose prose-slate">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Sobre o FreteLab</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            O <strong>FreteLab</strong> nasceu com um propósito claro: democratizar o acesso a ferramentas e
            informações técnicas para o ecossistema do transporte rodoviário de cargas no Brasil.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Sabemos que o dia a dia nas estradas e escritórios de logística é desafiador. Caminhoneiros autônomos, frotistas e
            operadores logísticos lidam constantemente com margens de lucro apertadas, oscilações no preço do diesel e
            regulamentações complexas da ANTT.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Nossa Missão</h2>
          <p className="text-slate-600 leading-relaxed">
            Oferecer calculadoras gratuitas, de altíssima precisão e sem necessidade de cadastro, permitindo que motoristas e
            gestores simulem custos operacionais e negociem fretes de forma justa e transparente.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Nossos Valores</h2>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>
              <strong>Transparência:</strong> Toda a metodologia matemática de nossas calculadoras é explicada de forma clara.
            </li>
            <li>
              <strong>Acessibilidade:</strong> Plataforma leve, otimizada para telefones celulares de motoristas e livre de barreiras.
            </li>
            <li>
              <strong>Precisão Técnica:</strong> Atualizações baseadas nas últimas resoluções e diretrizes logísticas brasileiras.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">Independência e Isenção</h2>
          <p className="text-slate-600 leading-relaxed">
            Não somos uma empresa de agenciamento de cargas nem vendemos seguros. Nossa isenção garante que as simulações e
            resultados mostrados aqui sejam imparciais, focando exclusivamente na sustentabilidade financeira do transportador.
          </p>
        </div>
      </article>
    </>
  );
}
