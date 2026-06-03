"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface ToolItem {
  name: string;
  desc: string;
  path: string;
  icon: string;
  popular: boolean;
  category: "financeiro" | "carga" | "regula";
  tags: string[];
}

const TOOLS: ToolItem[] = [
  {
    name: "Calculadora de Frete",
    desc: "Calcule preços sugeridos de frete a partir de distâncias, custos e margens de lucro desejadas.",
    path: "/ferramentas/calculadora-frete",
    icon: "🚚",
    popular: true,
    category: "financeiro",
    tags: ["frete", "preço", "custo", "viagem", "estimativa", "valor", "tabela"],
  },
  {
    name: "Custo por KM",
    desc: "Descubra o custo operacional real por quilômetro rodado do seu caminhão ou frota comercial.",
    path: "/ferramentas/calculadora-custo-operacional",
    icon: "📊",
    popular: true,
    category: "financeiro",
    tags: ["custo", "km", "quilometro", "pneu", "depreciação", "manutenção", "combustível", "diesel"],
  },
  {
    name: "Cálculo de Cubagem",
    desc: "Determine o volume em metros cúbicos (m³) e o peso cubado para transporte de cargas.",
    path: "/ferramentas/calculadora-cubagem",
    icon: "📦",
    popular: true,
    category: "carga",
    tags: ["cubagem", "volume", "metro", "cubico", "largura", "altura", "comprimento", "fator"],
  },
  {
    name: "Tabela ANTT",
    desc: "Estime o piso mínimo de frete obrigatório por lei nas resoluções vigentes da ANTT.",
    path: "/ferramentas/calculadora-antt",
    icon: "⚖️",
    popular: true,
    category: "regula",
    tags: ["antt", "piso", "minimo", "lei", "obrigatorio", "tabela", "resolução", "eixo", "eixos"],
  },
  {
    name: "Hora Parada (Estadia)",
    desc: "Calcule a indenização de estadia devida por atrasos no pátio conforme a Lei 11.442.",
    path: "/ferramentas/calculadora-hora-parada",
    icon: "⏱️",
    popular: false,
    category: "regula",
    tags: ["hora", "parada", "estadia", "lei 11.442", "carga", "descarga", "tolerancia", "atraso", "indenização"],
  },
  {
    name: "Frete por KM",
    desc: "Avalie a rentabilidade de fretes descobrindo o valor pago por quilômetro rodado.",
    path: "/ferramentas/calculadora-frete-km",
    icon: "🛣️",
    popular: false,
    category: "financeiro",
    tags: ["frete", "km", "rentabilidade", "ganho", "viagem", "proposta", "negociação"],
  },
  {
    name: "Lucro do Frete",
    desc: "Calcule a margem e o lucro real líquido restante da sua viagem após descontar custos.",
    path: "/ferramentas/calculadora-lucro-frete",
    icon: "💰",
    popular: false,
    category: "financeiro",
    tags: ["lucro", "liquido", "sobra", "margem", "receita", "ganho", "estrada"],
  },
  {
    name: "Cálculo de Diesel",
    desc: "Estime o volume total e os custos com combustível para abastecimento na rota.",
    path: "/ferramentas/calculadora-diesel",
    icon: "⛽",
    popular: false,
    category: "financeiro",
    tags: ["diesel", "combustível", "litros", "consumo", "preço", "abastecimento", "gasto"],
  },
  {
    name: "Pedágios Rota",
    desc: "Calcule os valores e tarifas de pedágio estimados de acordo com a quantidade de eixos.",
    path: "/ferramentas/calculadora-pedagio",
    icon: "🪙",
    popular: false,
    category: "financeiro",
    tags: ["pedagio", "eixo", "eixos", "tarifa", "praça", "custo", "viagem"],
  },
  {
    name: "Peso Cubado",
    desc: "Compare o peso real com o peso volumétrico (cubado) para correta cobrança fiscal.",
    path: "/ferramentas/calculadora-peso-cubado",
    icon: "⚖️",
    popular: false,
    category: "carga",
    tags: ["peso", "cubado", "volumetrico", "densidade", "balança", "tributação"],
  },
  {
    name: "Simulador de Frete",
    desc: "Simule tarifas integrando adicionais de GRIS, Ad Valorem, taxas de despacho e ICMS.",
    path: "/ferramentas/simulador-frete",
    icon: "💻",
    popular: false,
    category: "regula",
    tags: ["simulador", "tarifa", "gris", "ad valorem", "despacho", "icms", "imposto", "taxa"],
  },
  {
    name: "Conversor Peso x Volume",
    desc: "Realize conversões métricas e equivalências rápidas de peso para volume e vice-versa.",
    path: "/ferramentas/conversor-peso-volume",
    icon: "🔄",
    popular: false,
    category: "carga",
    tags: ["conversor", "peso", "volume", "quilograma", "tonelada", "litro", "metro", "cubico", "densidade"],
  },
  {
    name: "Planejador de Viagem",
    desc: "Faça um orçamento completo da viagem incluindo diesel, alimentação, pedagio e hotel.",
    path: "/ferramentas/planejador-viagem",
    icon: "🗺️",
    popular: false,
    category: "regula",
    tags: ["planejador", "viagem", "orçamento", "gasto", "hospedagem", "alimentação", "diaria"],
  },
  {
    name: "Margem de Lucro",
    desc: "Calcule markup, margens de ganho e rentabilidade de serviços logísticos.",
    path: "/ferramentas/calculadora-margem-lucro",
    icon: "📈",
    popular: false,
    category: "financeiro",
    tags: ["margem", "lucro", "markup", "rentabilidade", "porcentagem", "precificação"],
  },
  {
    name: "Ocupação de Carga",
    desc: "Aproveitamento do espaço físico (m³ e peso) no baú do caminhão ou contêiner.",
    path: "/ferramentas/calculadora-ocupacao-carga",
    icon: "🚛",
    popular: false,
    category: "carga",
    tags: ["ocupação", "espaço", "aproveitamento", "baú", "carreta", "contêiner", "palete"],
  },
  {
    name: "Consumo de Combustível",
    desc: "Calcule a média de consumo de diesel ou gasolina por quilômetro rodado (km/l).",
    path: "/ferramentas/calculadora-consumo-combustivel",
    icon: "📊",
    popular: false,
    category: "carga",
    tags: ["consumo", "combustível", "média", "rodagem", "km/l", "diesel", "gasolina"],
  },
  {
    name: "Tabela FIPE",
    desc: "Consulte o preço médio oficial de caminhões novos e usados por marca e modelo ou pelo código FIPE.",
    path: "/ferramentas/tabela-fipe-caminhoes",
    icon: "🚛",
    popular: false,
    category: "regula",
    tags: ["fipe", "tabela", "caminhao", "valor", "preço", "usado", "venda", "compra", "fipe caminhao"],
  },
  {
    name: "Custo de Pneu (CPK)",
    desc: "Calcule o custo por quilômetro (CPK) do pneu do seu caminhão. Avalie a rentabilidade de recapagens.",
    path: "/ferramentas/calculadora-custo-pneu",
    icon: "⭕",
    popular: false,
    category: "financeiro",
    tags: ["pneu", "recapagem", "cpk", "custo", "quilometragem", "pneus", "manutenção", "diesel"],
  },
];

type CategoryFilter = "all" | "financeiro" | "carga" | "regula";

export default function ToolsSearchList() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  // Normalized search function
  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      // Category filter
      if (activeCategory !== "all" && tool.category !== activeCategory) {
        return false;
      }

      // Query filter
      if (!query.trim()) return true;

      const normalizedQuery = query
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const matchesName = tool.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedQuery);

      const matchesDesc = tool.desc
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(normalizedQuery);

      const matchesTags = tool.tags.some((tag) =>
        tag
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(normalizedQuery)
      );

      return matchesName || matchesDesc || matchesTags;
    });
  }, [query, activeCategory]);

  const handleClearFilters = () => {
    setQuery("");
    setActiveCategory("all");
  };

  const categories = [
    { id: "all", name: "Todas as Calculadoras" },
    { id: "financeiro", name: "Financeiro & Custos" },
    { id: "carga", name: "Cubagem & Cargas" },
    { id: "regula", name: "Leis & Planejamento" },
  ] as const;

  // Split results when no search is active
  const popularTools = useMemo(() => {
    return filteredTools.filter((t) => t.popular);
  }, [filteredTools]);

  const otherTools = useMemo(() => {
    return filteredTools.filter((t) => !t.popular);
  }, [filteredTools]);

  const isSearchingOrFiltered = query.trim() !== "" || activeCategory !== "all";

  return (
    <div className="space-y-12">
      {/* Search Input and Categories block */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Lupa SVG */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 select-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Qual conta você precisa fazer? (Ex: frete, cubagem, estadia...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-slate-800 placeholder-slate-400 transition-all text-sm md:text-base font-medium"
          />

          {/* Clear search 'x' button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650 transition-colors p-1"
              aria-label="Limpar busca"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white shadow-sm shadow-primary/20 scale-[1.02]"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-650 border border-slate-200/40"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Results */}
      <div className="w-full">
        {filteredTools.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl p-8 max-w-xl mx-auto shadow-sm animate-fadeIn">
            <span className="text-4xl mb-4 block">🔍</span>
            <h3 className="font-extrabold text-slate-900 text-lg mb-2">Nenhuma calculadora encontrada</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed mb-6">
              Não encontramos resultados para "{query}". Tente buscar por termos mais genéricos como "diesel", "eixo", "estadia" ou "cubagem".
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-5 rounded-lg text-xs transition-colors cursor-pointer"
            >
              Limpar Filtros e Busca
            </button>
          </div>
        ) : isSearchingOrFiltered ? (
          /* Unified grid search result view */
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">
              Calculadoras Encontradas ({filteredTools.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm transition-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl select-none">{tool.icon}</span>
                      {tool.popular && (
                        <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                          Destaque
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-base text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1">
                    Acessar ferramenta <span>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Default split view (matches standard design layout) */
          <div className="space-y-12">
            {/* 1. Popular section */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">
                Ferramentas mais Utilizadas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularTools.map((tool) => (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm transition-card flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-3xl mb-4 block select-none">{tool.icon}</span>
                      <h4 className="font-extrabold text-base text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-primary group-hover:underline flex items-center gap-1">
                      Acessar ferramenta <span>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. All others list directory */}
            <div className="space-y-6 pt-6 border-t border-slate-200/40">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">
                Todas as Ferramentas Logísticas
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherTools.map((tool) => (
                  <Link
                    key={tool.path}
                    href={tool.path}
                    className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl select-none">{tool.icon}</span>
                        <h4 className="font-bold text-sm text-slate-900">{tool.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{tool.desc}</p>
                    </div>
                    <span className="text-[10px] text-slate-600 font-bold mt-4 hover:underline self-start">
                      Abrir calculadora →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
