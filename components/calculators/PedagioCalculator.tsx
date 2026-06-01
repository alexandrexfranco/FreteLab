"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function PedagioCalculator() {
  const [tollBooths, setTollBooths] = useState<number>(4);
  const [averageRate, setAverageRate] = useState<number>(12.5);
  const [axles, setAxles] = useState<number>(2);

  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const factor = axles >= 2 ? axles / 2 : 1;
    setTotalCost(tollBooths * averageRate * factor);
  }, [tollBooths, averageRate, axles]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="axles" className="block text-sm font-semibold text-slate-700 mb-2">
              Número de Eixos do Veículo: {axles} eixos
            </label>
            <select
              id="axles"
              value={axles}
              onChange={(e) => setAxles(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            >
              <option value={2}>2 Eixos (Caminhão ¾ / VUC)</option>
              <option value={3}>3 Eixos (Caminhão Toco / Truck)</option>
              <option value={4}>4 Eixos (Caminhão Truck Articulado)</option>
              <option value={6}>6 Eixos (Carreta / Cavalo Mecânico + Semirreboque)</option>
              <option value={7}>7 Eixos (Bitrem)</option>
              <option value={9}>9 Eixos (Rodotrem)</option>
            </select>
          </div>

          <div>
            <label htmlFor="tollBooths" className="block text-sm font-semibold text-slate-700 mb-2">
              Quantidade de Praças de Pedágio na Rota: {tollBooths}
            </label>
            <input
              id="tollBooths"
              type="range"
              min="0"
              max="50"
              step="1"
              value={tollBooths}
              onChange={(e) => setTollBooths(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0 praças</span>
              <span>50 praças</span>
            </div>
          </div>

          <div>
            <label htmlFor="averageRate" className="block text-sm font-semibold text-slate-700 mb-2">
              Tarifa Média por Eixo Duplo (R$)
            </label>
            <input
              id="averageRate"
              type="number"
              step="0.10"
              min="2"
              value={averageRate}
              onChange={(e) => setAverageRate(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Informações do Veículo
              </span>
              <div className="text-xl font-bold">{axles} Eixos - Multiplicador Proporcional</div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Custo Total Estimado de Pedágios
              </span>
              <div className="text-4xl font-extrabold text-white">
                R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
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
        reportTitle="Relatório de Despesas de Pedágio em Rota"
        parameters={[
          { label: "Número de Eixos do Caminhão", value: `${axles} Eixos` },
          { label: "Quantidade de Praças de Pedágio", value: `${tollBooths} Praças` },
          {
            label: "Tarifa Média por Eixo Duplo",
            value: `R$ ${averageRate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
        ]}
        results={[
          {
            label: "CUSTO TOTAL ESTIMADO DE PEDÁGIO",
            value: `R$ ${totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
