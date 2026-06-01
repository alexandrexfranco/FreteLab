"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function DieselCalculator() {
  const [distance, setDistance] = useState<number>(500);
  const [consumption, setConsumption] = useState<number>(2.5); // Km per Liter (Average truck)
  const [dieselPrice, setDieselPrice] = useState<number>(5.89);

  const [neededLiters, setNeededLiters] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (consumption > 0) {
      const liters = distance / consumption;
      const cost = liters * dieselPrice;
      setNeededLiters(liters);
      setTotalCost(cost);
    } else {
      setNeededLiters(0);
      setTotalCost(0);
    }
  }, [distance, consumption, dieselPrice]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
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

          <div>
            <label htmlFor="consumption" className="block text-sm font-semibold text-slate-700 mb-2">
              Consumo Médio do Caminhão (KM/L): {consumption.toFixed(1)} km/l
            </label>
            <input
              id="consumption"
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1.0 km/l</span>
              <span>10.0 km/l</span>
            </div>
          </div>

          <div>
            <label htmlFor="dieselPrice" className="block text-sm font-semibold text-slate-700 mb-2">
              Preço do Diesel por Litro (R$/L)
            </label>
            <input
              id="dieselPrice"
              type="number"
              step="0.01"
              min="1"
              value={dieselPrice}
              onChange={(e) => setDieselPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Combustível Necessário
              </span>
              <div className="text-2xl font-bold">
                {neededLiters.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Litros
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Custo Total Estimado de Diesel
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
        reportTitle="Relatório de Consumo e Gasto com Diesel"
        showSignatures={false}
        parameters={[
          { label: "Distância Total Simulada", value: `${distance} km` },
          { label: "Consumo Médio do Caminhão", value: `${consumption.toFixed(1)} km/l` },
          {
            label: "Preço do Diesel por Litro",
            value: `R$ ${dieselPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/L`,
          },
        ]}
        results={[
          {
            label: "Combustível Estimado Necessário (L)",
            value: `${neededLiters.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} Litros`,
            isBold: true,
          },
          {
            label: "CUSTO TOTAL DE DIESEL PROJETADO",
            value: `R$ ${totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
