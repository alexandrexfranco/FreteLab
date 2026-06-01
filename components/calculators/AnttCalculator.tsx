"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

const COEFFICIENTS = {
  general: { name: "Carga Geral", fixed: 250, runningPerAxle: 0.85 },
  solid_bulk: { name: "Granel Sólido", fixed: 280, runningPerAxle: 0.92 },
  liquid_bulk: { name: "Granel Líquido", fixed: 320, runningPerAxle: 0.98 },
  refrigerated: { name: "Carga Frigorificada", fixed: 380, runningPerAxle: 1.15 },
  hazardous: { name: "Carga Perigosa", fixed: 450, runningPerAxle: 1.25 },
};

export default function AnttCalculator() {
  const [cargoType, setCargoType] = useState<keyof typeof COEFFICIENTS>("general");
  const [axles, setAxles] = useState<number>(3);
  const [distance, setDistance] = useState<number>(450);

  const [minFreight, setMinFreight] = useState<number>(0);
  const [loadingCost, setLoadingCost] = useState<number>(0);
  const [runningCost, setRunningCost] = useState<number>(0);

  useEffect(() => {
    const config = COEFFICIENTS[cargoType];
    const fixed = config.fixed * (axles / 2);
    const running = distance * config.runningPerAxle * axles;

    setLoadingCost(fixed);
    setRunningCost(running);
    setMinFreight(fixed + running);
  }, [cargoType, axles, distance]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="cargoType" className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de Carga
            </label>
            <select
              id="cargoType"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value as keyof typeof COEFFICIENTS)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            >
              {Object.entries(COEFFICIENTS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="axles" className="block text-sm font-semibold text-slate-700 mb-2">
              Configuração de Eixos (Categoria do Caminhão): {axles} eixos
            </label>
            <select
              id="axles"
              value={axles}
              onChange={(e) => setAxles(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            >
              <option value={2}>2 Eixos (Caminhão ¾ / VUC)</option>
              <option value={3}>3 Eixos (Caminhão Truck)</option>
              <option value={4}>4 Eixos (Truck Articulado)</option>
              <option value={5}>5 Eixos (Carreta Simples)</option>
              <option value={6}>6 Eixos (Carreta LS)</option>
              <option value={7}>7 Eixos (Bitrem)</option>
              <option value={9}>9 Eixos (Rodotrem)</option>
            </select>
          </div>

          <div>
            <label htmlFor="distance" className="block text-sm font-semibold text-slate-700 mb-2">
              Distância da Rota: {distance} km
            </label>
            <input
              id="distance"
              type="range"
              min="10"
              max="3000"
              step="10"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>10 km</span>
              <span>3.000 km</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
                  Custo Fixo (Carga/Descarga)
                </span>
                <span className="text-lg font-bold">
                  R$ {loadingCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
                  Custo Deslocamento
                </span>
                <span className="text-lg font-bold">
                  R$ {runningCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Piso Mínimo Obrigatório ANTT
              </span>
              <div className="text-4xl font-extrabold text-white">
                R$ {minFreight.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block leading-normal">
                (Cálculo estimativo com base nos coeficientes de referência da ANTT para transporte de cargas)
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print();
              }
            }}
            className="mt-8 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Imprimir Relatório
          </button>
        </div>
      </div>

      {/* Print-Only Template */}
      <PrintReportTemplate
        reportTitle="Cálculo de Referência de Piso Mínimo ANTT"
        parameters={[
          { label: "Categoria da Carga Comercial", value: COEFFICIENTS[cargoType].name },
          { label: "Configuração de Eixos", value: `${axles} Eixos` },
          { label: "Distância Total Percorrida", value: `${distance} km` },
        ]}
        results={[
          {
            label: "Coeficiente de Carga e Descarga (Custo Fixo)",
            value: `R$ ${loadingCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Coeficiente de Deslocamento (Custo Variável)",
            value: `R$ ${runningCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "VALOR DO PISO MÍNIMO DO FRETE (ANTT)",
            value: `R$ ${minFreight.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
