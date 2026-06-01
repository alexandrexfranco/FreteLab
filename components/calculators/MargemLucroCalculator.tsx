"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function MargemLucroCalculator() {
  const [totalCost, setTotalCost] = useState<number>(1800);
  const [revenue, setRevenue] = useState<number>(2500);

  const [grossProfit, setGrossProfit] = useState<number>(0);
  const [netMargin, setNetMargin] = useState<number>(0);
  const [markup, setMarkup] = useState<number>(0);

  useEffect(() => {
    const profit = revenue - totalCost;
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const mkup = totalCost > 0 ? (profit / totalCost) * 100 : 0;

    setGrossProfit(profit);
    setNetMargin(margin);
    setMarkup(mkup);
  }, [totalCost, revenue]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="totalCost" className="block text-sm font-semibold text-slate-700 mb-2">
              Custo Total do Serviço/Operação (R$)
            </label>
            <input
              id="totalCost"
              type="number"
              min="1"
              value={totalCost}
              onChange={(e) => setTotalCost(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="revenue" className="block text-sm font-semibold text-slate-700 mb-2">
              Preço Cobrado do Cliente (Receita) (R$)
            </label>
            <input
              id="revenue"
              type="number"
              min="1"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Lucro Bruto Realizado
              </span>
              <div className={`text-2xl font-bold ${grossProfit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                R$ {grossProfit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Margem de Lucro Líquido
              </span>
              <div className="text-4xl font-extrabold text-white">
                {netMargin.toFixed(1)}%
              </div>
            </div>

            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Markup Aplicado (Sob Custo)
              </span>
              <div className="text-xl font-semibold">{markup.toFixed(1)}%</div>
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
        reportTitle="Demostração de Markup, Margens e Precificação"
        parameters={[
          { label: "Custo Operacional Total do Serviço", value: `R$ ${totalCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` },
          { label: "Preço Faturado Cobrado (Receita)", value: `R$ ${revenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` },
        ]}
        results={[
          {
            label: "Lucro Bruto Obtido (R$)",
            value: `R$ ${grossProfit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isBold: true,
          },
          { label: "Markup Calculado (Porcentagem de Margem Sobre o Custo)", value: `${markup.toFixed(1)}%` },
          {
            label: "MARGEM DE LUCRO LÍQUIDO (%)",
            value: `${netMargin.toFixed(1)}%`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
