"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

export default function CustoPneuCalculator() {
  const [isMounted, setIsMounted] = useState(false);

  // Input states
  const [priceNew, setPriceNew] = useState<number>(1800);
  const [kmNew, setKmNew] = useState<number>(80000);

  const [recap1Active, setRecap1Active] = useState<boolean>(true);
  const [recap1Price, setRecap1Price] = useState<number>(450);
  const [recap1Km, setRecap1Km] = useState<number>(60000);

  const [recap2Active, setRecap2Active] = useState<boolean>(false);
  const [recap2Price, setRecap2Price] = useState<number>(450);
  const [recap2Km, setRecap2Km] = useState<number>(50000);

  const [recap3Active, setRecap3Active] = useState<boolean>(false);
  const [recap3Price, setRecap3Price] = useState<number>(450);
  const [recap3Km, setRecap3Km] = useState<number>(40000);

  const [quantity, setQuantity] = useState<number>(1);

  // Output states
  const [totalCostPerTire, setTotalCostPerTire] = useState<number>(0);
  const [totalKmPerTire, setTotalKmPerTire] = useState<number>(0);
  const [generalCpk, setGeneralCpk] = useState<number>(0);

  const [cpkNew, setCpkNew] = useState<number>(0);
  const [cpkRecap1, setCpkRecap1] = useState<number>(0);
  const [cpkRecap2, setCpkRecap2] = useState<number>(0);
  const [cpkRecap3, setCpkRecap3] = useState<number>(0);

  // Dynamic calculations
  useEffect(() => {
    setIsMounted(true);

    const costTire =
      priceNew +
      (recap1Active ? recap1Price : 0) +
      (recap2Active ? recap2Price : 0) +
      (recap3Active ? recap3Price : 0);

    const kmTire =
      kmNew +
      (recap1Active ? recap1Km : 0) +
      (recap2Active ? recap2Km : 0) +
      (recap3Active ? recap3Km : 0);

    setTotalCostPerTire(costTire);
    setTotalKmPerTire(kmTire);

    if (kmTire > 0) {
      setGeneralCpk(costTire / kmTire);
    } else {
      setGeneralCpk(0);
    }

    // Individual CPK for each stage
    setCpkNew(kmNew > 0 ? priceNew / kmNew : 0);
    setCpkRecap1(recap1Active && recap1Km > 0 ? recap1Price / recap1Km : 0);
    setCpkRecap2(recap2Active && recap2Km > 0 ? recap2Price / recap2Km : 0);
    setCpkRecap3(recap3Active && recap3Km > 0 ? recap3Price / recap3Km : 0);
  }, [
    priceNew,
    kmNew,
    recap1Active,
    recap1Price,
    recap1Km,
    recap2Active,
    recap2Price,
    recap2Km,
    recap3Active,
    recap3Price,
    recap3Km,
  ]);

  if (!isMounted) {
    return (
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-white animate-pulse min-h-[500px] flex items-center justify-center">
        <p className="text-slate-400">Carregando calculadora de pneus...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 no-print">
        
        {/* Left Form Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Tire Config */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary block" />
              Pneu Novo (1ª Vida)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priceNew" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Preço de Aquisição (R$):
                </label>
                <input
                  id="priceNew"
                  type="number"
                  min="1"
                  value={priceNew}
                  onChange={(e) => setPriceNew(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                />
              </div>
              <div>
                <label htmlFor="kmNew" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  KM Rodados Esperados:
                </label>
                <input
                  id="kmNew"
                  type="number"
                  min="1"
                  value={kmNew}
                  onChange={(e) => setKmNew(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* 1st Recap Config */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${recap1Active ? "bg-primary" : "bg-slate-300"} block`} />
                1ª Recapagem (2ª Vida)
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={recap1Active}
                  onChange={(e) => setRecap1Active(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {recap1Active && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideDown">
                <div>
                  <label htmlFor="recap1Price" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Custo da Recapagem (R$):
                  </label>
                  <input
                    id="recap1Price"
                    type="number"
                    min="1"
                    value={recap1Price}
                    onChange={(e) => setRecap1Price(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="recap1Km" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    KM Rodados Esperados:
                  </label>
                  <input
                    id="recap1Km"
                    type="number"
                    min="1"
                    value={recap1Km}
                    onChange={(e) => setRecap1Km(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 2nd Recap Config */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${recap2Active ? "bg-primary" : "bg-slate-300"} block`} />
                2ª Recapagem (3ª Vida)
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={recap2Active}
                  onChange={(e) => setRecap2Active(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {recap2Active && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideDown">
                <div>
                  <label htmlFor="recap2Price" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Custo da Recapagem (R$):
                  </label>
                  <input
                    id="recap2Price"
                    type="number"
                    min="1"
                    value={recap2Price}
                    onChange={(e) => setRecap2Price(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="recap2Km" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    KM Rodados Esperados:
                  </label>
                  <input
                    id="recap2Km"
                    type="number"
                    min="1"
                    value={recap2Km}
                    onChange={(e) => setRecap2Km(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3rd Recap Config */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${recap3Active ? "bg-primary" : "bg-slate-300"} block`} />
                3ª Recapagem (4ª Vida)
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={recap3Active}
                  onChange={(e) => setRecap3Active(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {recap3Active && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slideDown">
                <div>
                  <label htmlFor="recap3Price" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Custo da Recapagem (R$):
                  </label>
                  <input
                    id="recap3Price"
                    type="number"
                    min="1"
                    value={recap3Price}
                    onChange={(e) => setRecap3Price(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="recap3Km" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    KM Rodados Esperados:
                  </label>
                  <input
                    id="recap3Km"
                    type="number"
                    min="1"
                    value={recap3Km}
                    onChange={(e) => setRecap3Km(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Lote / Volume Config */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary block" />
              Lote de Pneus (Opcional)
            </h3>
            <div>
              <label htmlFor="quantity" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Quantidade de Pneus Iguais no Lote:
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-800 bg-white text-sm"
              />
              <span className="text-[10px] text-slate-400 block mt-1.5">
                Ex: 4 pneus para o eixo de tração, ou 10 pneus para a carreta inteira.
              </span>
            </div>
          </div>
        </div>

        {/* Right Output Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between min-h-[480px]">
            
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block mb-1">
                  Métricas Gerais (Por Unidade)
                </span>
                <h3 className="text-xl font-extrabold text-white">CPK Geral do Pneu</h3>
              </div>

              {/* Big CPK Highlight */}
              <div className="bg-slate-950/65 border border-slate-800 p-5 rounded-xl">
                <span className="text-slate-400 text-xs font-medium block">Custo por KM Geral:</span>
                <div className="text-3xl md:text-4xl font-extrabold text-white mt-1 select-all">
                  R$ {generalCpk.toLocaleString("pt-BR", { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                </div>
                <span className="text-[10px] text-slate-500 block mt-1">
                  (R$ {(generalCpk * 1000).toLocaleString("pt-BR", { minimumFractionDigits: 2 })} a cada 1.000 km)
                </span>
              </div>

              {/* Individual life cycle statistics */}
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Eficiência por Ciclo de Vida
                </span>

                <div className="space-y-2 text-xs">
                  {/* Novo */}
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">1. Pneu Novo (1ª Vida):</span>
                    <strong className="text-white">
                      R$ {cpkNew.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}/km
                    </strong>
                  </div>

                  {/* Recap 1 */}
                  {recap1Active && (
                    <div className="flex justify-between items-center py-1 border-t border-slate-800/40">
                      <span className="text-slate-400">2. 1ª Recapagem:</span>
                      <strong className="text-emerald-400">
                        R$ {cpkRecap1.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}/km
                      </strong>
                    </div>
                  )}

                  {/* Recap 2 */}
                  {recap2Active && (
                    <div className="flex justify-between items-center py-1 border-t border-slate-800/40">
                      <span className="text-slate-400">3. 2ª Recapagem:</span>
                      <strong className="text-emerald-400">
                        R$ {cpkRecap2.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}/km
                      </strong>
                    </div>
                  )}

                  {/* Recap 3 */}
                  {recap3Active && (
                    <div className="flex justify-between items-center py-1 border-t border-slate-800/40">
                      <span className="text-slate-400">4. 3ª Recapagem:</span>
                      <strong className="text-emerald-400">
                        R$ {cpkRecap3.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}/km
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Summary */}
              <div className="border-t border-slate-800 pt-5 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">KM Total Acumulado:</span>
                  <strong className="text-white">{totalKmPerTire.toLocaleString("pt-BR")} km</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Investimento Total por Pneu:</span>
                  <strong className="text-white">
                    R$ {totalCostPerTire.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </strong>
                </div>
                {quantity > 1 && (
                  <div className="flex justify-between border-t border-slate-800/60 pt-2.5 text-slate-300">
                    <span>Investimento Total Lote ({quantity} un):</span>
                    <strong className="text-amber-500 font-bold text-sm">
                      R$ {(totalCostPerTire * quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </strong>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.print();
                }
              }}
              className="mt-8 w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Imprimir Relatório CPK
            </button>
          </div>
        </div>
      </div>

      {/* Print-Only Template */}
      <PrintReportTemplate
        reportTitle="Relatório Estatístico de Custo por KM de Pneu (CPK)"
        showSignatures={false}
        parameters={[
          {
            label: "Valor do Pneu Novo (1ª Vida)",
            value: `R$ ${priceNew.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
          },
          { label: "KM Rodados com Pneu Novo", value: `${kmNew.toLocaleString("pt-BR")} km` },
          {
            label: "1ª Recapagem Ativada / Custo / KM",
            value: recap1Active
              ? `SIM / R$ ${recap1Price.toLocaleString("pt-BR")} / ${recap1Km.toLocaleString("pt-BR")} km`
              : "NÃO",
          },
          {
            label: "2ª Recapagem Ativada / Custo / KM",
            value: recap2Active
              ? `SIM / R$ ${recap2Price.toLocaleString("pt-BR")} / ${recap2Km.toLocaleString("pt-BR")} km`
              : "NÃO",
          },
          {
            label: "3ª Recapagem Ativada / Custo / KM",
            value: recap3Active
              ? `SIM / R$ ${recap3Price.toLocaleString("pt-BR")} / ${recap3Km.toLocaleString("pt-BR")} km`
              : "NÃO",
          },
          { label: "Quantidade de Pneus no Lote", value: quantity },
        ]}
        results={[
          {
            label: "Quilometragem Total Rodada por Pneu",
            value: `${totalKmPerTire.toLocaleString("pt-BR")} km`,
            isBold: true,
          },
          {
            label: "Custo de Investimento Total por Pneu",
            value: `R$ ${totalCostPerTire.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
            isBold: true,
          },
          ...(quantity > 1
            ? [
                {
                  label: `CUSTO TOTAL DE INVESTIMENTO DO LOTE (${quantity} PNEUS)`,
                  value: `R$ ${(totalCostPerTire * quantity).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
                  isBold: true,
                },
              ]
            : []),
          {
            label: "CUSTO POR KM DE PNEU NOVO (1ª VIDA)",
            value: `R$ ${cpkNew.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}/km`,
          },
          ...(recap1Active
            ? [
                {
                  label: "CUSTO POR KM DA 1ª RECAPAGEM",
                  value: `R$ ${cpkRecap1.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}/km`,
                },
              ]
            : []),
          {
            label: "CUSTO POR QUILÔMETRO GERAL (CPK)",
            value: `R$ ${generalCpk.toLocaleString("pt-BR", { minimumFractionDigits: 4 })}/km`,
            isHighlight: true,
          },
        ]}
        notes="O cálculo de CPK (Custo por Quilômetro) ajuda frotistas e motoristas a descobrirem se a marca ou modelo do pneu oferece bom retorno financeiro e comprova a alta economia obtida pelas recapagens de qualidade, que diluem o valor inicial de compra do pneu novo."
      />
    </>
  );
}
