"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function LucroFreteCalculator() {
  const [freightRevenue, setFreightRevenue] = useState<number>(5000);
  const [dieselCost, setDieselCost] = useState<number>(1500);
  const [tollCost, setTollCost] = useState<number>(300);
  const [otherCosts, setOtherCosts] = useState<number>(400);

  const [netProfit, setNetProfit] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);

  useEffect(() => {
    const totalExpenses = dieselCost + tollCost + otherCosts;
    const profit = freightRevenue - totalExpenses;
    const margin = freightRevenue > 0 ? (profit / freightRevenue) * 100 : 0;

    setNetProfit(profit);
    setProfitMargin(margin);
  }, [freightRevenue, dieselCost, tollCost, otherCosts]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="freightRevenue" className="block text-sm font-semibold text-slate-700 mb-2">
              Valor do Frete Recebido (R$)
            </label>
            <input
              id="freightRevenue"
              type="number"
              min="0"
              value={freightRevenue}
              onChange={(e) => setFreightRevenue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="dieselCost" className="block text-sm font-semibold text-slate-700 mb-2">
              Gasto Estimado com Diesel (R$)
            </label>
            <input
              id="dieselCost"
              type="number"
              min="0"
              value={dieselCost}
              onChange={(e) => setDieselCost(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="tollCost" className="block text-sm font-semibold text-slate-700 mb-2">
              Gasto Estimado com Pedágio (R$)
            </label>
            <input
              id="tollCost"
              type="number"
              min="0"
              value={tollCost}
              onChange={(e) => setTollCost(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="otherCosts" className="block text-sm font-semibold text-slate-700 mb-2">
              Outras Despesas (Ajudante, Alimentação, etc.) (R$)
            </label>
            <input
              id="otherCosts"
              type="number"
              min="0"
              value={otherCosts}
              onChange={(e) => setOtherCosts(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Lucro Líquido Real
              </span>
              <div className={`text-4xl font-extrabold ${netProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                R$ {netProfit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Margem de Lucro Operacional
              </span>
              <div className={`text-3xl font-bold ${profitMargin >= 0 ? "text-white" : "text-red-400"}`}>
                {profitMargin.toFixed(1)}%
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Classificação do Frete
              </span>
              <div className="text-lg font-bold">
                {profitMargin > 30 ? (
                  <span className="text-emerald-400">Altamente Lucrativo 👍</span>
                ) : profitMargin > 15 ? (
                  <span className="text-yellow-400">Lucratividade Média ⚠️</span>
                ) : profitMargin > 0 ? (
                  <span className="text-orange-400">Alerta: Margem Baixa 🚨</span>
                ) : (
                  <span className="text-red-400">Prejuízo Financeiro! ❌</span>
                )}
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
        reportTitle="Demostração de Lucro e Margem de Frete"
        parameters={[
          {
            label: "Valor do Frete Recebido",
            value: `R$ ${freightRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Gasto com Óleo Diesel",
            value: `R$ ${dieselCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Custo com Pedágio",
            value: `R$ ${tollCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Outras Despesas e Custos Fixos",
            value: `R$ ${otherCosts.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
        ]}
        results={[
          {
            label: "Total de Despesas da Viagem",
            value: `R$ ${(dieselCost + tollCost + otherCosts).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isBold: true,
          },
          {
            label: "MARGEM DE LUCRO LÍQUIDO (%)",
            value: `${profitMargin.toFixed(1)}%`,
            isBold: true,
          },
          {
            label: "LUCRO LÍQUIDO REALIZADO",
            value: `R$ ${netProfit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
