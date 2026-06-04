import Link from "next/link";
import dynamic from "next/dynamic";
import FAQAccordion from "@/components/shared/FAQAccordion";
import AdSenseBanner from "@/components/ads/AdSenseBanner";

const ToolsSearchList = dynamic(() => import("@/components/shared/ToolsSearchList"), {
  ssr: true,
  loading: () => (
    <div className="space-y-12 animate-pulse">
      {/* Search Input Placeholder */}
      <div className="max-w-2xl mx-auto h-14 bg-slate-200/60 rounded-2xl" />
      {/* Category Pills Placeholder */}
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="w-32 h-9 bg-slate-200/60 rounded-full" />
        ))}
      </div>
      {/* Popular Tools Grid Placeholder */}
      <div className="space-y-6">
        <div className="h-4 w-48 bg-slate-200/60 rounded mx-auto md:mx-0" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 bg-slate-200/60 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  ),
});

const BLOG_ARTICLES = [
  {
    title: "Como funciona a Tabela de Frete Mínimo da ANTT 2026?",
    desc: "Guia completo sobre a regulamentação do piso mínimo, fiscalização e cálculo de indenizações por frete abaixo do piso.",
    author: "Equipe Editorial",
    date: "31 de Maio, 2026",
    path: "/autor",
  },
  {
    title: "Custo por KM de caminhão: Saiba como calcular o seu de forma correta",
    desc: "Aprenda a mapear custos fixos e variáveis como depreciação, seguro e pneus para precificar melhor seus fretes.",
    author: "Equipe Editorial",
    date: "25 de Maio, 2026",
    path: "/autor",
  },
  {
    title: "Passo a passo: Como calcular a cubagem de uma carga para o transporte rodoviário",
    desc: "Descubra como o fator de cubagem de 300 influencia o valor final cobrado pelas transportadoras de cargas leves.",
    author: "Equipe Editorial",
    date: "18 de Maio, 2026",
    path: "/autor",
  },
];

export default function Home() {
  const faqItems = [
    {
      question: "O que é o FreteLab?",
      answer:
        "O FreteLab é uma plataforma brasileira independente criada para oferecer calculadoras, simuladores e conteúdo de apoio gratuitos para caminhoneiros autônomos, frotistas e profissionais do setor logístico.",
    },
    {
      question: "As calculadoras são realmente gratuitas e sem cadastro?",
      answer:
        "Sim. Todas as 15 calculadoras (frete por km, cubagem, ANTT, etc.) estão disponíveis de forma totalmente gratuita e não exigem login ou cadastramento de dados para serem utilizadas.",
    },
    {
      question: "Como o FreteLab se mantém gratuito?",
      answer:
        "Nós nos mantemos por meio da exibição de anúncios publicitários discretos e parcerias com fornecedores do setor, garantindo que o motorista de caminhão nunca pague para fazer suas contas de viagem.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-20 px-4 text-center md:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              FreteLab: Calculadoras, Ferramentas e Conteúdo para Transporte e Logística
            </h1>
            <p className="text-base md:text-xl text-slate-300 max-w-3xl leading-relaxed">
              Otimize sua gestão logística, faça cálculos de frete rápidos, descubra seu custo por km, cubagem de carga,
              valores mínimos do frete ANTT e potencialize o lucro do frete nas estradas brasileiras.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <Link
                href="/ferramentas/calculadora-frete"
                className="bg-secondary hover:bg-secondary-hover text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-secondary/20 transition-all text-sm cursor-pointer"
              >
                Calcular Frete Agora
              </Link>
              <Link
                href="/blog"
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition-all text-sm cursor-pointer border border-white/20 hover:border-white/40"
              >
                Ler o Blog
              </Link>
              <Link
                href="/metodologia"
                className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold py-3 px-6 rounded-lg transition-all text-sm cursor-pointer"
              >
                Conhecer Metodologia
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 bg-slate-800/20 border border-slate-700/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm text-left">
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-1">
              Destaque do Mês
            </span>
            <h3 className="font-bold text-lg text-white mb-2">Piso Mínimo ANTT Atualizado</h3>
            <p className="text-xs text-slate-400 leading-normal mb-4">
              Calcule o piso mínimo de frete obrigatório por lei para a sua categoria de caminhão de acordo com as últimas resoluções.
            </p>
            <Link
              href="/ferramentas/calculadora-antt"
              className="text-xs font-bold text-secondary hover:text-white flex items-center gap-1 group"
            >
              Consultar Tabela ANTT <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* AD BLOCK (prevention of CLS) */}
      <div className="max-w-7xl mx-auto w-full px-4">
        <AdSenseBanner slot="1000000000" minHeight={90} />
      </div>

      {/* TOOLS SEARCH DIRECTORY */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full border-b border-slate-200/40">
        <header className="mb-12 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            Nossas Calculadoras e Simuladores
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
            Utilize nosso buscador inteligente abaixo ou filtre por categorias para encontrar a calculadora ideal para sua operação logística.
          </p>
        </header>

        <ToolsSearchList />
      </section>

      {/* BLOG GUIDES & ARTICLES */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <header className="mb-12 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Guias completos e Conteúdos do Setor
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            Aprenda a gerir sua frota de transporte rodoviário com artigos e materiais escritos por especialistas.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_ARTICLES.map((article, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-bold uppercase">
                  Artigo SEO
                </span>
                <h3 className="font-bold text-lg text-slate-900 leading-snug hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{article.desc}</p>
              </div>
              <div className="p-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <Link href={article.path} className="font-semibold text-slate-700 hover:underline">
                    {article.author}
                  </Link>
                  <span className="text-slate-400 block text-[10px]">{article.date}</span>
                </div>
                <Link href={article.path} className="text-primary font-bold hover:underline">
                  Ler guia completo
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AD BLOCK 2 */}
      <div className="max-w-7xl mx-auto w-full px-4">
        <AdSenseBanner slot="1000000020" minHeight={250} />
      </div>

      {/* TESTIMONIALS SECTION */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto w-full text-center">
          <header className="mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-2">
              Quem Usa e Recomenda
            </h2>
            <p className="text-sm text-slate-400">
              Profissionais que otimizaram sua rotina na estrada e escritórios logísticos com o FreteLab.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-800 text-left space-y-4">
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Uso a calculadora de custo por km toda semana. Me ajudou a perceber que eu estava perdendo dinheiro em
                algumas rotas de retorno. Hoje não dou partida sem fazer as contas aqui."
              </p>
              <div>
                <span className="font-bold text-xs text-white block">Marcos Silva</span>
                <span className="text-[10px] text-slate-500 block">Caminhoneiro Autônomo - Truck 3 Eixos</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-800 text-left space-y-4">
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "A calculadora de cubagem é sensacional. Nossos ajudantes usam no celular direto do pátio para verificar a
                alocação física do baú antes de iniciar o carregamento dos paletes."
              </p>
              <div>
                <span className="font-bold text-xs text-white block">Juliana Nogueira</span>
                <span className="text-[10px] text-slate-500 block">Gestora de Frota - Expresso Logístico</span>
              </div>
            </div>
            <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-800 text-left space-y-4">
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Consultei a tabela mínima da ANTT no FreteLab durante uma fiscalização na balança e comprovei as taxas. Site leve,
                rápido e fácil de usar no celular mesmo na estrada."
              </p>
              <div>
                <span className="font-bold text-xs text-white block">Ronaldo Costa</span>
                <span className="text-[10px] text-slate-500 block">Motorista Carreteiro Autônomo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 max-w-4xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 mb-8 text-center">
          Perguntas Frequentes
        </h2>
        <FAQAccordion items={faqItems} id="homepage-faq" />
      </section>
    </div>
  );
}
