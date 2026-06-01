"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function OcupacaoCargaCalculator() {
  const [vehicleVolumeCapacity, setVehicleVolumeCapacity] = useState<number>(45); // m³ (e.g., standard truck)
  const [cargoVolume, setCargoVolume] = useState<number>(32); // m³

  const [vehicleWeightCapacity, setVehicleWeightCapacity] = useState<number>(14000); // kg
  const [cargoWeight, setCargoWeight] = useState<number>(9500); // kg

  const [volumeUtilization, setVolumeUtilization] = useState<number>(0);
  const [weightUtilization, setWeightUtilization] = useState<number>(0);
  const [overallEfficiency, setOverallEfficiency] = useState<number>(0);

  useEffect(() => {
    const volUtil = vehicleVolumeCapacity > 0 ? (cargoVolume / vehicleVolumeCapacity) * 100 : 0;
    const weightUtil = vehicleWeightCapacity > 0 ? (cargoWeight / vehicleWeightCapacity) * 100 : 0;

    setVolumeUtilization(volUtil);
    setWeightUtilization(weightUtil);
    setOverallEfficiency(Math.max(volUtil, weightUtil));
  }, [vehicleVolumeCapacity, cargoVolume, vehicleWeightCapacity, cargoWeight]);

  return (
    <>
      {/* On-Screen Interactive Calculator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 no-print">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Capacidades Volumétricas (m³)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="vehicleVolumeCapacity" className="block text-xs font-semibold text-slate-700 mb-1">
                  Capacidade Total (m³)
                </label>
                <input
                  id="vehicleVolumeCapacity"
                  type="number"
                  min="1"
                  value={vehicleVolumeCapacity}
                  onChange={(e) => setVehicleVolumeCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
                />
              </div>
              <div>
                <label htmlFor="cargoVolume" className="block text-xs font-semibold text-slate-700 mb-1">
                  Volume da Carga (m³)
                </label>
                <input
                  id="cargoVolume"
                  type="number"
                  min="0"
                  value={cargoVolume}
                  onChange={(e) => setCargoVolume(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Capacidades de Peso (kg)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="vehicleWeightCapacity" className="block text-xs font-semibold text-slate-700 mb-1">
                  Lotação do Caminhão (kg)
                </label>
                <input
                  id="vehicleWeightCapacity"
                  type="number"
                  min="1"
                  value={vehicleWeightCapacity}
                  onChange={(e) => setVehicleWeightCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
                />
              </div>
              <div>
                <label htmlFor="cargoWeight" className="block text-xs font-semibold text-slate-700 mb-1">
                  Peso da Carga (kg)
                </label>
                <input
                  id="cargoWeight"
                  type="number"
                  min="0"
                  value={cargoWeight}
                  onChange={(e) => setCargoWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Aproveitamento Volumétrico (m³)
              </span>
              <div className="text-2xl font-bold">{volumeUtilization.toFixed(1)}%</div>
            </div>

            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                Aproveitamento de Peso (kg)
              </span>
              <div className="text-2xl font-bold">{weightUtilization.toFixed(1)}%</div>
            </div>

            <div>
              <span className="text-secondary text-xs font-semibold uppercase tracking-wider block mb-1">
                Eficiência Geral de Ocupação da Carga
              </span>
              <div className="text-4xl font-extrabold text-white">{overallEfficiency.toFixed(1)}%</div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                (Indica o gargalo operacional. Se aproximar de 100%, o caminhão atingiu o limite de peso ou espaço físico)
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
        reportTitle="Relatório de Eficiência e Aproveitamento de Capacidade"
        showSignatures={false}
        parameters={[
          { label: "Capacidade Volumétrica do Veículo", value: `${vehicleVolumeCapacity} m³` },
          { label: "Volume de Carga Alocado", value: `${cargoVolume} m³` },
          { label: "Capacidade de Carga em Peso (Lotação)", value: `${vehicleWeightCapacity.toLocaleString("pt-BR")} kg` },
          { label: "Peso Físico da Carga", value: `${cargoWeight.toLocaleString("pt-BR")} kg` },
        ]}
        results={[
          { label: "Porcentagem de Ocupação Volumétrica (m³)", value: `${volumeUtilization.toFixed(1)}%` },
          { label: "Porcentagem de Lotação de Peso (kg)", value: `${weightUtilization.toFixed(1)}%` },
          {
            label: "EFICIÊNCIA GERAL DE OCUPAÇÃO DO CAMINHÃO",
            value: `${overallEfficiency.toFixed(1)}%`,
            isHighlight: true,
          },
        ]}
      />
    </>
  );
}
