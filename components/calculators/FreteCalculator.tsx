"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function FreteCalculator() {
  const [distance, setDistance] = useState<number>(350);
  const [costPerKm, setCostPerKm] = useState<number>(2.5);
  const [toll, setToll] = useState<number>(120);
  const [margin, setMargin] = useState<number>(30);

  const [totalCost, setTotalCost] = useState<number>(0);
  const [suggestedPrice, setSuggestedPrice] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const runningCost = distance * costPerKm;
    const cost = runningCost + toll;
    const price = cost / (1 - margin / 100);
    const gain = price - cost;

    setTotalCost(cost);
    setSuggestedPrice(price);
    setProfit(gain);
  }, [distance, costPerKm, toll, margin]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        {/* Inputs Form */}
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
            <label htmlFor="costPerKm" className="block text-sm font-semibold text-slate-700 mb-2">
              Custo por Quilômetro Rodado (R$/km)
            </label>
            <input
              id="costPerKm"
              type="number"
              step="0.01"
              min="0.5"
              value={costPerKm}
              onChange={(e) => setCostPerKm(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="toll" className="block text-sm font-semibold text-slate-700 mb-2">
              Pedágio Total (R$)
            </label>
            <input
              id="toll"
              type="number"
              step="1"
              min="0"
              value={toll}
              onChange={(e) => setToll(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="margin" className="block text-sm font-semibold text-slate-700 mb-2">
              Margem de Lucro Desejada: {margin}%
            </label>
            <input
              id="margin"
              type="range"
              min="5"
              max="80"
              step="1"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>5%</span>
              <span>80%</span>
            </div>
          </div>
        </div>

        {/* Results View */}
        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Custo Operacional Total
              </span>
              <div className="text-2xl font-bold text-white">
                R$ {totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Preço de Frete Sugerido
              </span>
              <div className="text-4xl font-extrabold text-white">
                R$ {suggestedPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Lucro Líquido Estimado
              </span>
              <div className="text-2xl font-bold text-emerald-400">
                R$ {profit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
        reportTitle="Planilha de Simulação de Frete & Custos"
        parameters={[
          { label: "Distância da Rota Simulada", value: `${distance} km` },
          {
            label: "Custo por Quilômetro Rodado (Rodagem do Veículo)",
            value: `R$ ${costPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
          },
          {
            label: "Pedágio Total Estimado",
            value: `R$ ${toll.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          { label: "Margem de Lucro Líquida Desejada", value: `${margin}%` },
        ]}
        results={[
          {
            label: "Custo de Rodagem (Quilometragem × Custo por KM)",
            value: `R$ ${(distance * costPerKm).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Custo de Pedágios na Rota",
            value: `R$ ${toll.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "CUSTO OPERACIONAL TOTAL DA VIAGEM",
            value: `R$ ${totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isBold: true,
          },
          {
            label: "LUCRO LÍQUIDO SIMULADO",
            value: `R$ ${profit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isHighlight: true,
          },
          {
            label: "VALOR DE FRETE SUGERIDO (VENDA MÍNIMA)",
            value: `R$ ${suggestedPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isBold: true,
          },
        ]}
      />
    </>
  );
}
