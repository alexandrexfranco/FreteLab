"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function CustoOperacionalCalculator() {
  const [fixedCosts, setFixedCosts] = useState<number>(3500); // R$ per month (License, IPVA, Insurance, Salary)
  const [monthlyKm, setMonthlyKm] = useState<number>(6000); // km per month
  const [variableCostPerKm, setVariableCostPerKm] = useState<number>(1.8); // R$ (Fuel, tires, maintenance)

  const [fixedCostPerKm, setFixedCostPerKm] = useState<number>(0);
  const [totalCostPerKm, setTotalCostPerKm] = useState<number>(0);

  useEffect(() => {
    if (monthlyKm > 0) {
      const fixedPerKm = fixedCosts / monthlyKm;
      setFixedCostPerKm(fixedPerKm);
      setTotalCostPerKm(fixedPerKm + variableCostPerKm);
    } else {
      setFixedCostPerKm(0);
      setTotalCostPerKm(0);
    }
  }, [fixedCosts, monthlyKm, variableCostPerKm]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="fixedCosts" className="block text-sm font-semibold text-slate-700 mb-2">
              Custos Fixos Mensais Totais (R$/mês)
              <span className="block text-[10px] text-slate-400 font-normal">
                (IPVA, Seguro, Salário do Motorista, Depreciação, Rastreamento)
              </span>
            </label>
            <input
              id="fixedCosts"
              type="number"
              min="0"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="monthlyKm" className="block text-sm font-semibold text-slate-700 mb-2">
              Quilometragem Rodada por Mês: {monthlyKm.toLocaleString("pt-BR")} km
            </label>
            <input
              id="monthlyKm"
              type="range"
              min="1000"
              max="25000"
              step="500"
              value={monthlyKm}
              onChange={(e) => setMonthlyKm(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1.000 km</span>
              <span>25.000 km</span>
            </div>
          </div>

          <div>
            <label htmlFor="variableCostPerKm" className="block text-sm font-semibold text-slate-700 mb-2">
              Custos Variáveis por KM Rodado (R$/km)
              <span className="block text-[10px] text-slate-400 font-normal">
                (Combustível, Pneus, Óleos, Manutenção Corretiva, Lavagens)
              </span>
            </label>
            <input
              id="variableCostPerKm"
              type="number"
              step="0.05"
              min="0"
              value={variableCostPerKm}
              onChange={(e) => setVariableCostPerKm(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
                  Custo Fixo por KM
                </span>
                <span className="text-xl font-bold">
                  R$ {fixedCostPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/km
                </span>
              </div>
              <div className="border-l border-slate-800 pl-4">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
                  Custo Variável por KM
                </span>
                <span className="text-xl font-bold">
                  R$ {variableCostPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/km
                </span>
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Custo Operacional Total do Veículo
              </span>
              <div className="text-4xl font-extrabold text-white">
                R$ {totalCostPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/km
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block leading-normal">
                (Seu valor de frete líquido recebido por quilômetro DEVE ser superior a este custo para que haja lucro)
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
        reportTitle="Demonstrativo de Custos Operacionais do Veículo"
        parameters={[
          {
            label: "Custos Fixos Mensais Totais",
            value: `R$ ${fixedCosts.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês`,
          },
          { label: "Quilometragem Média Mensal", value: `${monthlyKm.toLocaleString("pt-BR")} km/mês` },
          {
            label: "Custos Variáveis por KM Rodado",
            value: `R$ ${variableCostPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
          },
        ]}
        results={[
          {
            label: "Custo Fixo Proporcional por KM",
            value: `R$ ${fixedCostPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
          },
          {
            label: "Custo Variável Direto por KM",
            value: `R$ ${variableCostPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
          },
          {
            label: "CUSTO OPERACIONAL TOTAL POR KM RODADO",
            value: `R$ ${totalCostPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
