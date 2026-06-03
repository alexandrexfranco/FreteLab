"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function HoraParadaCalculator() {
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [dischargeTime, setDischargeTime] = useState<string>("");
  const [capacity, setCapacity] = useState<number | "">(15);
  const [rate, setRate] = useState<number>(2.5); // R$ 2,50/ton/hour default (2026 update)
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Result state
  const [result, setResult] = useState<{
    totalHours: number;
    formattedTotalTime: string;
    excessHours: number;
    formattedExcessTime: string;
    totalValue: number;
    capacity: number;
    rate: number;
  } | null>(null);

  // Set default values only on client to avoid Next.js hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10); // YYYY-MM-DD
    setArrivalTime(`${todayStr}T08:00`);
    setDischargeTime(`${todayStr}T16:30`);
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!arrivalTime || !dischargeTime) {
      setError("Por favor, preencha ambas as datas e horários.");
      setResult(null);
      return;
    }

    const arrival = new Date(arrivalTime);
    const discharge = new Date(dischargeTime);

    if (isNaN(arrival.getTime()) || isNaN(discharge.getTime())) {
      setError("Por favor, insira datas e horários válidos.");
      setResult(null);
      return;
    }

    const diffMs = discharge.getTime() - arrival.getTime();

    if (diffMs < 0) {
      setError("A data/hora de início da descarga deve ser posterior à de chegada.");
      setResult(null);
      return;
    }

    if (!capacity || capacity <= 0) {
      setError("Por favor, informe uma capacidade de veículo maior que zero.");
      setResult(null);
      return;
    }

    if (rate < 0) {
      setError("O valor da tarifa hora/tonelada não pode ser negativo.");
      setResult(null);
      return;
    }

    const totalHours = diffMs / (1000 * 60 * 60);
    
    // Total wait time formatted
    const totalMinutesAbs = Math.floor(diffMs / (1000 * 60));
    const totalH = Math.floor(totalMinutesAbs / 60);
    const totalM = totalMinutesAbs % 60;
    const formattedTotalTime = `${totalH}h ${totalM.toString().padStart(2, "0")}m`;

    // Excess hours calculation (tolerance of 5 hours)
    const excessHours = Math.max(0, totalHours - 5);
    const excessMinutesAbs = Math.max(0, totalMinutesAbs - 300);
    const excessH = Math.floor(excessMinutesAbs / 60);
    const excessM = excessMinutesAbs % 60;
    const formattedExcessTime = excessHours > 0 ? `${excessH}h ${excessM.toString().padStart(2, "0")}m` : "0h 00m";

    // Value calculation
    const totalValue = excessHours * Number(capacity) * rate;

    setResult({
      totalHours,
      formattedTotalTime,
      excessHours,
      formattedExcessTime,
      totalValue,
      capacity: Number(capacity),
      rate,
    });
  };

  const handleClear = () => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    setArrivalTime(`${todayStr}T08:00`);
    setDischargeTime(`${todayStr}T16:30`);
    setCapacity(15);
    setRate(2.5);
    setResult(null);
    setError(null);
  };

  if (!isMounted) {
    return (
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-white animate-pulse min-h-[500px] flex items-center justify-center">
        <p className="text-slate-400">Carregando calculadora...</p>
      </div>
    );
  }

  return (
    <>
      {/* Interactive visual panel */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden text-white no-print">
        {/* Subtle decorative grid/glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950/0 to-slate-950/0 -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 p-6 md:p-10">
          
          {/* Left panel info (Obligations and Law text) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 tracking-tight leading-tight">
                  Calculadora de Hora Parada
                </h2>
                <p className="text-sm text-slate-300 mt-2">
                  Preencha os campos ao lado para calcular a remuneração pela hora parada.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Obrigações do Transportador
                  </h3>
                  <p className="text-sm text-slate-300 pl-3.5 mt-1 leading-relaxed">
                    Comunicar o embarcador ou destinatário, em tempo hábil, a chegada da carga ao destino.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Obrigações do Embarcador/Destinatário
                  </h3>
                  <div className="text-sm text-slate-300 pl-3.5 mt-1 space-y-1.5 leading-relaxed">
                    <p>Prover documento hábil a comprovar a hora de chegada do caminhão em suas dependências.</p>
                    <p>Remunerar o transportador pela hora parada a partir da 5ª hora.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning card (light green precisely as in mockup) */}
            <div className="bg-[#e6f4ea] border border-emerald-900/10 rounded-xl p-4 text-[#137333] text-sm leading-relaxed shadow-sm">
              <span className="font-bold">Atenção:</span> Para maiores dúvidas, consulte a{" "}
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11442.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-[#0f6229] transition-colors"
              >
                Lei nº 11.442
              </a>
              , de 05/01/2017, em seu Artigo 11, que dispõe sobre a obrigatoriedade da remuneração da hora parada,{" "}
              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2007/lei/l11442.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium underline hover:text-blue-800 transition-colors"
              >
                clicando aqui
              </a>
              .
            </div>
          </div>

          {/* Right panel form & output */}
          <div className="lg:col-span-7 bg-slate-950/40 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="arrivalTime" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Data e Hora da Chegada:
                  </label>
                  <input
                    id="arrivalTime"
                    type="datetime-local"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white transition-all text-sm [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label htmlFor="dischargeTime" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Data e Hora do Início da Descarga:
                  </label>
                  <input
                    id="dischargeTime"
                    type="datetime-local"
                    value={dischargeTime}
                    onChange={(e) => setDischargeTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white transition-all text-sm [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="capacity" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Capacidade do Veículo (ton.):
                  </label>
                  <input
                    id="capacity"
                    type="number"
                    step="0.01"
                    min="0.1"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value === "" ? "" : Number(e.target.value))}
                    required
                    placeholder="Ex: 15"
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white transition-all placeholder-slate-650 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="rate" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Tarifa Hora/Tonelada (R$/ton/h):
                  </label>
                  <input
                    id="rate"
                    type="number"
                    step="0.01"
                    min="0"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white transition-all text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-950/40 border border-red-900/50 text-red-200 px-4 py-3 rounded-xl text-xs">
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-amber-600/10 text-sm uppercase tracking-wider text-center cursor-pointer"
                >
                  Calcular
                </button>
                {result && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-all text-sm cursor-pointer"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </form>

            {/* Interactive Output display inside the card */}
            {result && (
              <div className="border-t border-slate-800/80 pt-6 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs text-slate-400">
                  <div>
                    <span className="block font-medium">Tempo de Espera Total:</span>
                    <strong className="text-white text-sm block mt-0.5">{result.formattedTotalTime}</strong>
                  </div>
                  <div>
                    <span className="block font-medium">Horas de Franquia (Isento):</span>
                    <strong className="text-slate-400 text-sm block mt-0.5">5h 00m</strong>
                  </div>
                  <div>
                    <span className="block font-medium">Tempo Excedente a Pagar:</span>
                    <strong className={`${result.excessHours > 0 ? "text-amber-500" : "text-slate-400"} text-sm block mt-0.5`}>
                      {result.formattedExcessTime}
                    </strong>
                  </div>
                  <div>
                    <span className="block font-medium">Capacidade do Veículo:</span>
                    <strong className="text-white text-sm block mt-0.5">{result.capacity.toLocaleString("pt-BR")} toneladas</strong>
                  </div>
                </div>

                {/* Final Value Highlight Box */}
                <div className="bg-gradient-to-r from-amber-600/10 to-amber-700/5 border border-amber-600/25 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold block mb-0.5">
                      Indenização de Estadia Devida
                    </span>
                    <div className="text-3xl font-extrabold text-white">
                      R$ {result.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  {result.totalValue > 0 && (
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.print();
                        }
                      }}
                      className="bg-white hover:bg-slate-100 text-slate-900 font-bold py-2 px-4 rounded-lg text-xs shadow-sm transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-center"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Imprimir Recibo
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print-Only Template */}
      {result && (
        <PrintReportTemplate
          reportTitle="Demonstrativo de Cálculo de Hora Parada (Estadia)"
          showSignatures={true}
          parameters={[
            {
              label: "Data e Hora da Chegada",
              value: new Date(arrivalTime).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
            },
            {
              label: "Data e Hora do Início da Descarga",
              value: new Date(dischargeTime).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
            },
            { label: "Capacidade de Carga Informada", value: `${result.capacity.toLocaleString("pt-BR")} toneladas` },
            {
              label: "Tarifa por Tonelada/Hora",
              value: `R$ ${result.rate.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/ton/h`,
            },
            { label: "Franquia Legal de Tolerância", value: "5 horas (Isento)" },
          ]}
          results={[
            { label: "Tempo de Espera Total", value: result.formattedTotalTime, isBold: true },
            { label: "Tempo Excedente Cobrado", value: result.formattedExcessTime },
            {
              label: "VALOR DA INDENIZAÇÃO POR ESTADIA",
              value: `R$ ${result.totalValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
              isHighlight: true,
            },
          ]}
          notes={`Cálculo baseado no Artigo 11, § 5º da Lei Federal nº 11.442/2007 (regulamentando que o prazo máximo de carga e descarga é de 5 horas, após o qual o transportador tem direito a indenização pela capacidade total do veículo).`}
        />
      )}
    </>
  );
}
