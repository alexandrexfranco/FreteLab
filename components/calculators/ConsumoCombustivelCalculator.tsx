"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function ConsumoCombustivelCalculator() {
  const [distance, setDistance] = useState<number>(450); // km
  const [liters, setLiters] = useState<number>(180); // liters
  const [pricePerLiter, setPricePerLiter] = useState<number>(5.89); // R$/L

  const [consumption, setConsumption] = useState<number>(0);
  const [costPerKm, setCostPerKm] = useState<number>(0);

  useEffect(() => {
    if (liters > 0) {
      setConsumption(distance / liters);
    } else {
      setConsumption(0);
    }

    if (distance > 0) {
      setCostPerKm((liters * pricePerLiter) / distance);
    } else {
      setCostPerKm(0);
    }
  }, [distance, liters, pricePerLiter]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="distance" className="block text-sm font-semibold text-slate-700 mb-2">
              Quilometragem Rodada (km)
            </label>
            <input
              id="distance"
              type="number"
              min="1"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="liters" className="block text-sm font-semibold text-slate-700 mb-2">
              Quantidade de Litros Abastecidos (L)
            </label>
            <input
              id="liters"
              type="number"
              min="1"
              value={liters}
              onChange={(e) => setLiters(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="pricePerLiter" className="block text-sm font-semibold text-slate-700 mb-2">
              Preço Pago por Litro (R$/L)
            </label>
            <input
              id="pricePerLiter"
              type="number"
              step="0.01"
              min="1"
              value={pricePerLiter}
              onChange={(e) => setPricePerLiter(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Consumo Médio Obtido
              </span>
              <div className="text-4xl font-extrabold text-white">
                {consumption.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} km/l
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Custo de Combustível por KM
              </span>
              <div className="text-3xl font-bold text-white">
                R$ {costPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/km
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
        reportTitle="Relatório Estatístico de Consumo de Combustível"
        showSignatures={false}
        parameters={[
          { label: "Quilometragem Total Rodada", value: `${distance.toLocaleString("pt-BR")} km` },
          { label: "Volume de Combustível Abastecido", value: `${liters.toLocaleString("pt-BR")} Litros` },
          { label: "Valor Pago por Litro de Combustível", value: `R$ ${pricePerLiter.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/L` },
        ]}
        results={[
          {
            label: "MÉDIA DE CONSUMO OBTIDA (KM/L)",
            value: `${consumption.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} km/l`,
            isBold: true,
          },
          {
            label: "CUSTO DE COMBUSTÍVEL PROPORCIONAL POR KM RODADO",
            value: `R$ ${costPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
