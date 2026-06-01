"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function PlanejadorViagemCalculator() {
  const [distance, setDistance] = useState<number>(600);
  const [days, setDays] = useState<number>(3);
  const [consumption, setConsumption] = useState<number>(2.5); // km/l
  const [dieselPrice, setDieselPrice] = useState<number>(5.89);
  const [tolls, setTolls] = useState<number>(150);
  const [foodSpend, setFoodSpend] = useState<number>(60); // per day
  const [sleepSpend, setSleepSpend] = useState<number>(100); // per day

  const [dieselTotal, setDieselTotal] = useState<number>(0);
  const [personalSpend, setPersonalSpend] = useState<number>(0);
  const [tripCost, setTripCost] = useState<number>(0);
  const [costPerKm, setCostPerKm] = useState<number>(0);

  useEffect(() => {
    const dieselLiters = consumption > 0 ? distance / consumption : 0;
    const dieselCost = dieselLiters * dieselPrice;

    const personal = (foodSpend + sleepSpend) * days;
    const total = dieselCost + tolls + personal;

    setDieselTotal(dieselCost);
    setPersonalSpend(personal);
    setTripCost(total);
    setCostPerKm(distance > 0 ? total / distance : 0);
  }, [distance, days, consumption, dieselPrice, tolls, foodSpend, sleepSpend]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="distance" className="block text-xs font-semibold text-slate-700 mb-1">
                Distância (km)
              </label>
              <input
                id="distance"
                type="number"
                min="1"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
            <div>
              <label htmlFor="days" className="block text-xs font-semibold text-slate-700 mb-1">
                Dias de Viagem
              </label>
              <input
                id="days"
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="consumption" className="block text-xs font-semibold text-slate-700 mb-1">
                Consumo KM/L
              </label>
              <input
                id="consumption"
                type="number"
                step="0.1"
                min="0.5"
                value={consumption}
                onChange={(e) => setConsumption(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
            <div>
              <label htmlFor="dieselPrice" className="block text-xs font-semibold text-slate-700 mb-1">
                Diesel (R$/L)
              </label>
              <input
                id="dieselPrice"
                type="number"
                step="0.01"
                min="1"
                value={dieselPrice}
                onChange={(e) => setDieselPrice(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tolls" className="block text-sm font-semibold text-slate-700 mb-2">
              Pedágio Total Estimado (R$)
            </label>
            <input
              id="tolls"
              type="number"
              min="0"
              value={tolls}
              onChange={(e) => setTolls(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="foodSpend" className="block text-xs font-semibold text-slate-700 mb-1">
                Alimentação (R$/dia)
              </label>
              <input
                id="foodSpend"
                type="number"
                min="0"
                value={foodSpend}
                onChange={(e) => setFoodSpend(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
            <div>
              <label htmlFor="sleepSpend" className="block text-xs font-semibold text-slate-700 mb-1">
                Pernoite/Hotel (R$/dia)
              </label>
              <input
                id="sleepSpend"
                type="number"
                min="0"
                value={sleepSpend}
                onChange={(e) => setSleepSpend(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 border-b border-slate-800 pb-2">
              <div>Combustível Total:</div>
              <div className="text-right text-white font-semibold">
                R$ {dieselTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div>Pedágios Totais:</div>
              <div className="text-right text-white font-semibold">
                R$ {tolls.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div>Custos Pessoais:</div>
              <div className="text-right text-white font-semibold">
                R$ {personalSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div>Custo Médio por KM:</div>
              <div className="text-right text-white font-semibold">
                R$ {costPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Custo Estimado da Viagem
              </span>
              <div className="text-4xl font-extrabold text-white">
                R$ {tripCost.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
        reportTitle="Planilha de Estimativa e Orçamento de Rota Logística"
        parameters={[
          { label: "Distância Total da Viagem", value: `${distance} km` },
          { label: "Duração Estimada da Viagem", value: `${days} dias` },
          { label: "Consumo Médio do Caminhão", value: `${consumption} km/l` },
          {
            label: "Preço do Combustível por Litro",
            value: `R$ ${dieselPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/L`,
          },
          {
            label: "Tarifa Total de Pedágios",
            value: `R$ ${tolls.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Custo Alimentação por Dia",
            value: `R$ ${foodSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/dia`,
          },
          {
            label: "Custo Hospedagem por Dia",
            value: `R$ ${sleepSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/dia`,
          },
        ]}
        results={[
          {
            label: "Custo com Diesel (Combustível)",
            value: `R$ ${dieselTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Gasto com Pedágios na Rota",
            value: `R$ ${tolls.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Despesas Pessoais Totais (Alimentação + Estadia)",
            value: `R$ ${personalSpend.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "CUSTO OPERACIONAL PROPORCIONAL POR KM",
            value: `R$ ${costPerKm.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/km`,
            isBold: true,
          },
          {
            label: "CUSTO TOTAL CALCULADO DA VIAGEM",
            value: `R$ ${tripCost.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
