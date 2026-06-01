"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function SimuladorFreteCalculator() {
  const [cargoValue, setCargoValue] = useState<number>(85000);
  const [taxableWeight, setTaxableWeight] = useState<number>(3200); // kg
  const [distance, setDistance] = useState<number>(480); // km
  const [adValoremRate, setAdValoremRate] = useState<number>(0.15); // %
  const [grisRate, setGrisRate] = useState<number>(0.12); // %
  const [icmsRate, setIcmsRate] = useState<number>(12); // %

  const [freightWeight, setFreightWeight] = useState<number>(0);
  const [adValorem, setAdValorem] = useState<number>(0);
  const [gris, setGris] = useState<number>(0);
  const [icms, setIcms] = useState<number>(0);
  const [totalFreight, setTotalFreight] = useState<number>(0);

  useEffect(() => {
    const baseWeightRate = 0.15 * (distance / 100);
    const weightFreight = taxableWeight * baseWeightRate;

    const valueFreight = cargoValue * (adValoremRate / 100);
    const grisFreight = cargoValue * (grisRate / 100);

    const subtotal = weightFreight + valueFreight + grisFreight;
    const tax = subtotal * (icmsRate / 100);

    setFreightWeight(weightFreight);
    setAdValorem(valueFreight);
    setGris(grisFreight);
    setIcms(tax);
    setTotalFreight(subtotal + tax);
  }, [cargoValue, taxableWeight, distance, adValoremRate, grisRate, icmsRate]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="cargoValue" className="block text-sm font-semibold text-slate-700 mb-2">
              Valor Comercial da Carga (Nota Fiscal) (R$)
            </label>
            <input
              id="cargoValue"
              type="number"
              min="0"
              value={cargoValue}
              onChange={(e) => setCargoValue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="taxableWeight" className="block text-xs font-semibold text-slate-700 mb-1">
                Peso Taxável (kg)
              </label>
              <input
                id="taxableWeight"
                type="number"
                min="1"
                value={taxableWeight}
                onChange={(e) => setTaxableWeight(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label htmlFor="adValoremRate" className="block text-[10px] font-semibold text-slate-700 mb-1">
                Ad Valorem (%)
              </label>
              <input
                id="adValoremRate"
                type="number"
                step="0.01"
                value={adValoremRate}
                onChange={(e) => setAdValoremRate(Number(e.target.value))}
                className="w-full px-2 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
            <div>
              <label htmlFor="grisRate" className="block text-[10px] font-semibold text-slate-700 mb-1">
                GRIS (%)
              </label>
              <input
                id="grisRate"
                type="number"
                step="0.01"
                value={grisRate}
                onChange={(e) => setGrisRate(Number(e.target.value))}
                className="w-full px-2 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
            <div>
              <label htmlFor="icmsRate" className="block text-[10px] font-semibold text-slate-700 mb-1">
                ICMS (%)
              </label>
              <input
                id="icmsRate"
                type="number"
                step="1"
                value={icmsRate}
                onChange={(e) => setIcmsRate(Number(e.target.value))}
                className="w-full px-2 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 border-b border-slate-800 pb-2">
              <div>Frete Peso:</div>
              <div className="text-right text-white font-semibold">
                R$ {freightWeight.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div>Ad Valorem:</div>
              <div className="text-right text-white font-semibold">
                R$ {adValorem.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div>GRIS (Risco):</div>
              <div className="text-right text-white font-semibold">
                R$ {gris.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div>ICMS:</div>
              <div className="text-right text-white font-semibold">
                R$ {icms.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Valor Total do Frete Simulado
              </span>
              <div className="text-4xl font-extrabold text-white">
                R$ {totalFreight.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
        reportTitle="Demonstrativo de Cálculo e Simulação de Frete Industrial"
        parameters={[
          {
            label: "Valor Declarado da Carga (NF)",
            value: `R$ ${cargoValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          { label: "Peso Taxável da Carga", value: `${taxableWeight.toLocaleString("pt-BR")} kg` },
          { label: "Distância Rota", value: `${distance} km` },
          { label: "Taxa Ad Valorem (Seguro)", value: `${adValoremRate}%` },
          { label: "Taxa GRIS (Rastreamento/Risco)", value: `${grisRate}%` },
          { label: "Alíquota ICMS Aplicada", value: `${icmsRate}%` },
        ]}
        results={[
          {
            label: "Valor Base do Frete Peso",
            value: `R$ ${freightWeight.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Taxa Ad Valorem (Seguro de Carga)",
            value: `R$ ${adValorem.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Taxa de Gerenciamento de Risco (GRIS)",
            value: `R$ ${gris.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          {
            label: "Imposto Estadual (ICMS)",
            value: `R$ ${icms.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isBold: true,
          },
          {
            label: "VALOR TOTAL DE FRETE FATURADO",
            value: `R$ ${totalFreight.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
