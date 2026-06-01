"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function ConversorPesoVolumeCalculator() {
  const [conversionType, setConversionType] = useState<"weightToVolume" | "volumeToWeight">("volumeToWeight");
  const [inputValue, setInputValue] = useState<number>(12); // liters / m3 or kg
  const [factor, setFactor] = useState<number>(300); // 300 kg/m3 standard for Road Freight

  const [convertedValue, setConvertedValue] = useState<number>(0);

  useEffect(() => {
    if (conversionType === "volumeToWeight") {
      setConvertedValue(inputValue * factor);
    } else {
      setConvertedValue(factor > 0 ? inputValue / factor : 0);
    }
  }, [conversionType, inputValue, factor]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <label htmlFor="conversionType" className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de Conversão
            </label>
            <select
              id="conversionType"
              value={conversionType}
              onChange={(e) => {
                setConversionType(e.target.value as "weightToVolume" | "volumeToWeight");
                setInputValue(12);
              }}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            >
              <option value="volumeToWeight">Volume (m³) para Peso Equivalente (kg)</option>
              <option value="weightToVolume">Peso (kg) para Volume Equivalente (m³)</option>
            </select>
          </div>

          <div>
            <label htmlFor="inputValue" className="block text-sm font-semibold text-slate-700 mb-2">
              {conversionType === "volumeToWeight" ? "Volume de Entrada (m³)" : "Peso de Entrada (kg)"}
            </label>
            <input
              id="inputValue"
              type="number"
              min="0.1"
              step="0.1"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>

          <div>
            <label htmlFor="factor" className="block text-sm font-semibold text-slate-700 mb-2">
              Fator de Cubagem Relativo (kg/m³)
            </label>
            <input
              id="factor"
              type="number"
              min="1"
              value={factor}
              onChange={(e) => setFactor(Number(e.target.value))}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Valor de Entrada Informado
              </span>
              <div className="text-xl font-bold">
                {inputValue.toLocaleString("pt-BR", { minimumFractionDigits: 1 })} {conversionType === "volumeToWeight" ? "m³" : "kg"}
              </div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Resultado Convertido
              </span>
              <div className="text-4xl font-extrabold text-white">
                {convertedValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                {conversionType === "volumeToWeight" ? "kg" : "m³"}
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
        reportTitle="Relatório de Equivalência de Peso e Volume"
        showSignatures={false}
        parameters={[
          {
            label: "Direção de Conversão",
            value:
              conversionType === "volumeToWeight"
                ? "Metros Cúbicos (Volume) para Quilos (Peso)"
                : "Quilos (Peso) para Metros Cúbicos (Volume)",
          },
          {
            label: "Valor de Entrada",
            value: `${inputValue.toLocaleString("pt-BR")} ${conversionType === "volumeToWeight" ? "m³" : "kg"}`,
          },
          { label: "Fator de Cubagem de Referência", value: `${factor} kg/m³` },
        ]}
        results={[
          {
            label: "RESULTADO DA CONVERSÃO EQUIVALENTE",
            value: `${convertedValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} ${
              conversionType === "volumeToWeight" ? "kg" : "m³"
            }`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
