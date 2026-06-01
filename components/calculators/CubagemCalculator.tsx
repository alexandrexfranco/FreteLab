"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function CubagemCalculator() {
  const [width, setWidth] = useState<number>(1.2); // Meters
  const [height, setHeight] = useState<number>(1.6); // Meters
  const [length, setLength] = useState<number>(1.5); // Meters
  const [quantity, setQuantity] = useState<number>(5);
  const [cubageFactor, setCubageFactor] = useState<number>(300); // 300 kg/m3 standard for Road Freight

  const [totalVolume, setTotalVolume] = useState<number>(0);
  const [cubedWeight, setCubedWeight] = useState<number>(0);

  useEffect(() => {
    const singleVolume = width * height * length;
    const totalVol = singleVolume * quantity;
    const totalCubed = totalVol * cubageFactor;

    setTotalVolume(totalVol);
    setCubedWeight(totalCubed);
  }, [width, height, length, quantity, cubageFactor]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
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
              Quantidade de Volumes (Caixas/Paletes): {quantity}
            </label>
            <input
              id="quantity"
              type="range"
              min="1"
              max="150"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1 volume</span>
              <span>150 volumes</span>
            </div>
          </div>

          <div>
            <label htmlFor="cubageFactor" className="block text-sm font-semibold text-slate-700 mb-2">
              Fator de Cubagem (kg/m³)
            </label>
            <select
              id="cubageFactor"
              value={cubageFactor}
              onChange={(e) => setCubageFactor(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            >
              <option value={300}>300 kg/m³ (Padrão Rodoviário Geral)</option>
              <option value={167}>167 kg/m³ (Padrão Aéreo Nacional)</option>
              <option value={1000}>1.000 kg/m³ (Padrão Aquaviário / Marítimo)</option>
            </select>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Volume Total da Carga
              </span>
              <div className="text-3xl font-extrabold text-white">
                {totalVolume.toLocaleString("pt-BR", { minimumFractionDigits: 3, maximumFractionDigits: 3 })} m³
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Peso Cubado Estimado
              </span>
              <div className="text-4xl font-extrabold text-white">
                {cubedWeight.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} kg
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                (Usado para comparar com o peso real na precificação de fretes)
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
        reportTitle="Relatório de Cálculo de Cubagem Logística"
        showSignatures={false}
        parameters={[
          { label: "Medidas da Carga (L x A x C)", value: `${width}m x ${height}m x ${length}m` },
          { label: "Quantidade de Volumes", value: `${quantity} Volumes` },
          { label: "Fator de Cubagem de Referência", value: `${cubageFactor} kg/m³` },
        ]}
        results={[
          {
            label: "VOLUME TOTAL DE CARGA",
            value: `${totalVolume.toLocaleString("pt-BR", { minimumFractionDigits: 3 })} m³`,
            isBold: true,
          },
          {
            label: "PESO CUBADO EQUIVALENTE",
            value: `${cubedWeight.toLocaleString("pt-BR", { minimumFractionDigits: 0 })} kg`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
