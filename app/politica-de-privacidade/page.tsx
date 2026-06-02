import type { Metadata } from "next";
import SEOBreadcrumb from "@/components/shared/SEOBreadcrumb";

export const metadata: Metadata = {
  title: "Política de Privacidade | FreteLab",
  description:
    "Confira as políticas de privacidade do FreteLab. Detalhes sobre tratamento de dados, cookies do Google AdSense e conformidade com a LGPD.",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
};

export default function Page() {
  return (
    <>
      <SEOBreadcrumb items={[{ name: "Política de Privacidade", item: "/politica-de-privacidade" }]} />
      <article className="min-h-screen bg-slate-50/50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-12 rounded-2xl border border-slate-200 shadow-sm prose prose-slate text-slate-600">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Política de Privacidade</h1>
          <p>
            Esta política de privacidade descreve como o <strong>FreteLab</strong> gerencia e protege as informações recolhidas
            durante a navegação em nosso website.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">1. Coleta de Informações de Navegação</h2>
          <p>
            Coletamos informações anônimas de telemetria por meio de cookies e scripts de terceiros, como o Google Analytics,
            com o objetivo de entender a audiência do site, otimizar a velocidade de carregamento e verificar o uso das calculadoras.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">2. Cookies de Terceiros e Google AdSense</h2>
          <p>
            O FreteLab exibe anúncios veiculados pelo Google AdSense. O Google utiliza cookies (como o cookie DART) para servir
            anúncios com base nas visitas anteriores do usuário a este e a outros websites na Internet.
          </p>
          <p>
            Os usuários podem desativar a publicidade personalizada acessando as Configurações de anúncios do Google ou o site
            optout.aboutads.info.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">3. Proteção de Dados e LGPD</h2>
          <p>
            O FreteLab não exige cadastro, senha ou inserção de dados pessoais identificáveis (como CPF, placas de veículos
            ou endereços residenciais) para o uso de suas 15 calculadoras. Caso você se inscreva em nossa newsletter, seu e-mail
            será armazenado em ambiente seguro no banco de dados e nunca será comercializado com terceiros.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">4. Alterações nesta Política</h2>
          <p>
            Reservamo-nos o direito de atualizar este documento periodicamente. Recomendamos a consulta frequente desta página
            para acompanhar eventuais alterações.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">5. Contato</h2>
          <p>
            Caso tenha qualquer dúvida sobre esta Política de Privacidade ou sobre o tratamento de seus dados, entre em contato
            pelo e-mail: <a href="mailto:contato@fretelab.com.br" className="text-primary hover:underline">contato@fretelab.com.br</a>.
          </p>
        </div>
      </article>
    </>
  );
}
