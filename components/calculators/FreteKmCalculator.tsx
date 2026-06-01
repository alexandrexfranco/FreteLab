"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function FreteKmCalculator() {
  const [totalFreight, setTotalFreight] = useState<number>(3500);
  const [distance, setDistance] = useState<number>(850);

  const [ratePerKm, setRatePerKm] = useState<number>(0);

  useEffect(() => {
    if (distance > 0) {
      setRatePerKm(totalFreight / distance);
    } else {
      setRatePerKm(0);
    }
  }, [totalFreight, distance]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="totalFreight" className="block text-sm font-semibold text-slate-700 mb-2">
              Valor Total do Frete Ofertado (R$)
            </label>
            <input
              id="totalFreight"
              type="number"
              min="10"
              value={totalFreight}
              onChange={(e) => setTotalFreight(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="distance" className="block text-sm font-semibold text-slate-700 mb-2">
              Distância Total da Viagem: {distance} km
            </label>
            <input
              id="distance"
              type="range"
              min="10"
              max="4000"
              step="10"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>10 km</span>
              <span>4.000 km</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Distância total informada
              </span>
              <div className="text-xl font-bold">{distance} km</div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Valor do Frete por KM Rodado
              </span>
              <div className="text-4xl font-extrabold text-white">
                R$ {ratePerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/km
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

      <PrintReportTemplate
        reportTitle="Demonstrativo de Frete por KM"
        parameters={[
          {
            label: "Valor do Frete Ofertado",
            value: `R$ ${totalFreight.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          { label: "Distância Total da Viagem", value: `${distance} km` },
        ]}
        results={[
          {
            label: "VALOR DO FRETE POR KM RODADO",
            value: `R$ ${ratePerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
