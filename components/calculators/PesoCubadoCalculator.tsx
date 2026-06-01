"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function PesoCubadoCalculator() {
  const [actualWeight, setActualWeight] = useState<number>(850); // kg
  const [width, setWidth] = useState<number>(1.2); // m
  const [height, setHeight] = useState<number>(1.8); // m
  const [length, setLength] = useState<number>(1.5); // m
  const [quantity, setQuantity] = useState<number>(4);
  const [factor, setFactor] = useState<number>(300);

  const [cubedWeight, setCubedWeight] = useState<number>(0);
  const [taxableWeight, setTaxableWeight] = useState<number>(0);
  const [useCubed, setUseCubed] = useState<boolean>(false);

  useEffect(() => {
    const singleVolume = width * height * length;
    const totalVolume = singleVolume * quantity;
    const totalCubed = totalVolume * factor;

    setCubedWeight(totalCubed);

    if (totalCubed > actualWeight) {
      setTaxableWeight(totalCubed);
      setUseCubed(true);
    } else {
      setTaxableWeight(actualWeight);
      setUseCubed(false);
    }
  }, [actualWeight, width, height, length, quantity, factor]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="actualWeight" className="block text-sm font-semibold text-slate-700 mb-2">
              Peso Real Total (Bruto) (kg)
            </label>
            <input
              id="actualWeight"
              type="number"
              min="1"
              value={actualWeight}
              onChange={(e) => setActualWeight(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="width" className="block text-xs font-semibold text-slate-700 mb-1">
                Largura (m)
              </label>
              <input
                id="width"
                type="number"
                step="0.01"
                min="0.1"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
            <div>
              <label htmlFor="height" className="block text-xs font-semibold text-slate-700 mb-1">
                Altura (m)
              </label>
              <input
                id="height"
                type="number"
                step="0.01"
                min="0.1"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
            <div>
              <label htmlFor="length" className="block text-xs font-semibold text-slate-700 mb-1">
                Comprimento (m)
              </label>
              <input
                id="length"
                type="number"
                step="0.01"
                min="0.1"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
              />
            </div>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-semibold text-slate-700 mb-2">
              Quantidade de Volumes
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Comparativo de Pesos
              </span>
              <div className="flex gap-4 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Peso Real</span>
                  <span className="text-xl font-bold">{actualWeight.toLocaleString("pt-BR")} kg</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Peso Cubado</span>
                  <span className="text-xl font-bold">{cubedWeight.toLocaleString("pt-BR")} kg</span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Peso Taxável (Para Cobrança de Frete)
              </span>
              <div className="text-4xl font-extrabold text-white">
                {taxableWeight.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} kg
              </div>
              <span className="text-xs text-emerald-400 mt-2 block font-medium">
                {useCubed
                  ? "Cobrar por peso cubado (Mercadoria volumosa) 📦"
                  : "Cobrar por peso real (Mercadoria densa) ⚖️"}
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
        reportTitle="Relatório Comparativo de Peso e Volume (Cubagem)"
        parameters={[
          { label: "Peso Real Total Informado", value: `${actualWeight.toLocaleString("pt-BR")} kg` },
          { label: "Medidas Unitárias (L x A x C)", value: `${width}m x ${height}m x ${length}m` },
          { label: "Quantidade de Volumes", value: `${quantity} Volumes` },
          { label: "Fator de Cubagem Relativo", value: `${factor} kg/m³` },
        ]}
        results={[
          { label: "Peso Real Total", value: `${actualWeight.toLocaleString("pt-BR")} kg` },
          { label: "Peso Cubado Equivalente", value: `${cubedWeight.toLocaleString("pt-BR")} kg` },
          {
            label: "Critério de Cobrança Sugerido",
            value: useCubed ? "Cobrar por Volume (Cubagem)" : "Cobrar por Peso Real",
            isBold: true,
          },
          {
            label: "PESO TAXÁVEL TOTAL",
            value: `${taxableWeight.toLocaleString("pt-BR")} kg`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
