import Link from "next/link";

const CALCULATORS = [
  { name: "Cálculo de Frete", path: "/ferramentas/calculadora-frete" },
  { name: "Frete por KM", path: "/ferramentas/calculadora-frete-km" },
  { name: "Lucro do Frete", path: "/ferramentas/calculadora-lucro-frete" },
  { name: "Cálculo de Diesel", path: "/ferramentas/calculadora-diesel" },
  { name: "Pedágios Rota", path: "/ferramentas/calculadora-pedagio" },
  { name: "Cálculo de Cubagem", path: "/ferramentas/calculadora-cubagem" },
  { name: "Peso Cubado", path: "/ferramentas/calculadora-peso-cubado" },
  { name: "Custo por KM", path: "/ferramentas/calculadora-custo-operacional" },
  { name: "Tabela ANTT", path: "/ferramentas/calculadora-antt" },
  { name: "Simulador Frete", path: "/ferramentas/simulador-frete" },
  { name: "Conversor Peso/Vol", path: "/ferramentas/conversor-peso-volume" },
  { name: "Planejar Viagem", path: "/ferramentas/planejador-viagem" },
  { name: "Margem de Lucro", path: "/ferramentas/calculadora-margem-lucro" },
  { name: "Ocupação Carga", path: "/ferramentas/calculadora-ocupacao-carga" },
  { name: "Consumo de Médias", path: "/ferramentas/calculadora-consumo-combustivel" },
  { name: "Hora Parada", path: "/ferramentas/calculadora-hora-parada" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 px-4 mt-auto no-print">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* FreteLab Profile */}
        <div className="md:col-span-1 space-y-4">
          <span className="text-xl font-extrabold text-white tracking-tight">FreteLab</span>
          <p className="text-xs text-slate-500 leading-normal">
            A maior plataforma brasileira de calculadoras e simuladores logísticos 100% gratuitos para transportadores.
          </p>
          <div className="text-xs text-slate-500 space-y-2">
            <div>
              © {new Date().getFullYear()} FreteLab. Todos os direitos reservados.
            </div>
            <div>
              Contato:{" "}
              <a href="mailto:contato@fretelab.com.br" className="text-slate-400 hover:text-white transition-colors">
                contato@fretelab.com.br
              </a>
            </div>
            <div className="block pt-1">
              <Link href="/admin/login" className="hover:text-slate-400 transition-colors">
                Painel Administrativo
              </Link>
            </div>
          </div>
        </div>

        {/* 15 Calculators Grid List */}
        <div className="md:col-span-2 space-y-4">
          <span className="font-bold text-white text-sm block border-b border-slate-900 pb-2">
            Calculadoras Gratuitas
          </span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {CALCULATORS.map((el) => (
              <Link key={el.path} href={el.path} className="hover:text-white transition-colors duration-100">
                {el.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Institutional & E-E-A-T */}
        <div className="md:col-span-1 space-y-4">
          <span className="font-bold text-white text-sm block border-b border-slate-900 pb-2">
            Institucional
          </span>
          <div className="flex flex-col space-y-2 text-xs">
            <Link href="/sobre" className="hover:text-white">
              Sobre o FreteLab
            </Link>
            <Link href="/autor" className="hover:text-white">
              Especialistas
            </Link>
            <Link href="/metodologia" className="hover:text-white">
              Fórmulas e Métodos
            </Link>
            <Link href="/politica-de-privacidade" className="hover:text-white">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="hover:text-white">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer Block */}
      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 text-center text-[10px] text-slate-600 leading-relaxed">
        <strong>AVISO LEGAL:</strong> Os cálculos, projeções de custos, diesel, pedagio e pisos mínimos simulados no FreteLab
        são meramente estimativos e informativos, servindo apenas como base de referência preliminar. Não nos responsabilizamos por
        decisões financeiras, fiscais, ou comerciais tomadas com base nestas simulações. Verifique sempre todos os dados da rota antes de
        assinar contratos ou dar partida no veículo.
      </div>
    </footer>
  );
}
