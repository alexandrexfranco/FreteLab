"use client";

import { useState, useEffect } from "react";
import PrintReportTemplate from "../shared/PrintReportTemplate";

interface Brand {
  code: string;
  name: string;
}

interface Model {
  code: string;
  name: string;
}

interface Year {
  code: string;
  name: string;
}

interface VehicleDetails {
  vehicleType: number;
  price: string;
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
  fuelAcronym: string;
}

export default function TabelaFipeCaminhoes() {
  const [activeTab, setActiveTab] = useState<"modelo" | "codigo">("modelo");
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // STEP BY MODEL STATE
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYear, setSelectedYear] = useState("");

  // BY FIPE CODE STATE
  const [fipeCode, setFipeCode] = useState("");
  const [fipeYears, setFipeYears] = useState<Year[]>([]);
  const [selectedFipeYear, setSelectedFipeYear] = useState("");

  // COMMON LOADERS
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadingFipeYears, setLoadingFipeYears] = useState(false);

  // FINAL RESULTS
  const [details, setDetails] = useState<VehicleDetails | null>(null);

  // 1. Mount and Fetch Brands
  useEffect(() => {
    setIsMounted(true);
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoadingBrands(true);
    setError(null);
    try {
      const res = await fetch("https://fipe.parallelum.com.br/api/v2/trucks/brands");
      if (!res.ok) throw new Error("Erro ao carregar marcas.");
      const data = await res.json();
      setBrands(data);
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível carregar as marcas. Verifique sua conexão e tente novamente.");
    } finally {
      setLoadingBrands(false);
    }
  };

  // 2. Fetch Models when Brand changes
  useEffect(() => {
    if (!selectedBrand) {
      setModels([]);
      setSelectedModel("");
      setYears([]);
      setSelectedYear("");
      return;
    }
    fetchModels(selectedBrand);
  }, [selectedBrand]);

  const fetchModels = async (brandCode: string) => {
    setLoadingModels(true);
    setError(null);
    try {
      const res = await fetch(`https://fipe.parallelum.com.br/api/v2/trucks/brands/${brandCode}/models`);
      if (!res.ok) throw new Error("Erro ao carregar modelos.");
      const data = await res.json();
      setModels(data);
      setSelectedModel("");
      setYears([]);
      setSelectedYear("");
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar a lista de modelos da marca.");
    } finally {
      setLoadingModels(false);
    }
  };

  // 3. Fetch Years when Model changes
  useEffect(() => {
    if (!selectedModel) {
      setYears([]);
      setSelectedYear("");
      return;
    }
    fetchYears(selectedBrand, selectedModel);
  }, [selectedModel]);

  const fetchYears = async (brandCode: string, modelCode: string) => {
    setLoadingYears(true);
    setError(null);
    try {
      const res = await fetch(`https://fipe.parallelum.com.br/api/v2/trucks/brands/${brandCode}/models/${modelCode}/years`);
      if (!res.ok) throw new Error("Erro ao carregar anos.");
      const data = await res.json();
      setYears(data);
      setSelectedYear("");
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar os anos do modelo selecionado.");
    } finally {
      setLoadingYears(false);
    }
  };

  // 4. Fetch Details when Year changes
  useEffect(() => {
    if (!selectedYear) {
      setDetails(null);
      return;
    }
    fetchDetails(selectedBrand, selectedModel, selectedYear);
  }, [selectedYear]);

  const fetchDetails = async (brandCode: string, modelCode: string, yearCode: string) => {
    setLoadingDetails(true);
    setError(null);
    try {
      const res = await fetch(`https://fipe.parallelum.com.br/api/v2/trucks/brands/${brandCode}/models/${modelCode}/years/${yearCode}`);
      if (!res.ok) throw new Error("Erro ao obter detalhes.");
      const data = await res.json();
      setDetails(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar detalhes e preço do caminhão.");
    } finally {
      setLoadingDetails(false);
    }
  };

  // 5. Search FIPE Code directly
  const handleFipeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFipeYears([]);
    setSelectedFipeYear("");
    setDetails(null);

    const cleanCode = fipeCode.replace(/[^\d-]/g, "");
    if (!cleanCode || cleanCode.length < 7) {
      setError("Por favor, informe um código FIPE válido com 7 dígitos (ex: 501034-9).");
      return;
    }

    setLoadingFipeYears(true);
    try {
      // API expects XXXXXX-X format or simple digits.
      const formattedCode = cleanCode.includes("-") ? cleanCode : `${cleanCode.slice(0, 6)}-${cleanCode.slice(6)}`;
      const res = await fetch(`https://fipe.parallelum.com.br/api/v2/trucks/${formattedCode}/years`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Código FIPE não encontrado ou não corresponde a um caminhão.");
        }
        throw new Error("Erro na consulta.");
      }
      const data = await res.json();
      setFipeYears(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro ao consultar código FIPE. Verifique o número digitado.");
    } finally {
      setLoadingFipeYears(false);
    }
  };

  // 6. Fetch FIPE Code details by year
  useEffect(() => {
    if (!selectedFipeYear) {
      setDetails(null);
      return;
    }
    fetchFipeDetails(fipeCode, selectedFipeYear);
  }, [selectedFipeYear]);

  const fetchFipeDetails = async (code: string, yearCode: string) => {
    setLoadingDetails(true);
    setError(null);
    try {
      const cleanCode = code.replace(/[^\d-]/g, "");
      const formattedCode = cleanCode.includes("-") ? cleanCode : `${cleanCode.slice(0, 6)}-${cleanCode.slice(6)}`;
      const res = await fetch(`https://fipe.parallelum.com.br/api/v2/trucks/${formattedCode}/years/${yearCode}`);
      if (!res.ok) throw new Error("Erro ao carregar detalhes.");
      const data = await res.json();
      setDetails(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar o valor FIPE do ano selecionado.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleClear = () => {
    setSelectedBrand("");
    setModels([]);
    setSelectedModel("");
    setYears([]);
    setSelectedYear("");
    setFipeCode("");
    setFipeYears([]);
    setSelectedFipeYear("");
    setDetails(null);
    setError(null);
  };

  // Masking FIPE Code as typing: XXXXXX-X
  const handleFipeCodeChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 7);
    if (digits.length > 6) {
      setFipeCode(`${digits.slice(0, 6)}-${digits.slice(6)}`);
    } else {
      setFipeCode(digits);
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-white animate-pulse min-h-[450px] flex items-center justify-center">
        <p className="text-slate-400">Carregando tabela FIPE...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl shadow-2xl relative overflow-hidden text-white no-print">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950/0 to-slate-950/0 -z-10" />

        <div className="p-6 md:p-10 space-y-8">
          {/* Header block with tabs */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-amber-500 tracking-tight leading-tight">
                Consulta Tabela FIPE Caminhões
              </h2>
              <p className="text-sm text-slate-400 mt-1.5">
                Consulte valores de caminhões novos e usados diretamente da tabela oficial da FIPE.
              </p>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex bg-slate-950/60 p-1 rounded-xl border border-slate-800/60 w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveTab("modelo");
                  handleClear();
                }}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "modelo" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Buscar por Modelo
              </button>
              <button
                onClick={() => {
                  setActiveTab("codigo");
                  handleClear();
                }}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "codigo" ? "bg-amber-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Buscar por Código FIPE
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Selection Forms (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-950/30 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6">
              
              {activeTab === "modelo" ? (
                /* TAB 1: MODEL NAVIGATION */
                <div className="space-y-5">
                  {/* Select Brand */}
                  <div>
                    <label htmlFor="brand-select" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      1. Selecione a Marca:
                    </label>
                    <select
                      id="brand-select"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      disabled={loadingBrands}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white text-sm cursor-pointer disabled:opacity-50"
                    >
                      <option value="">-- Selecione a Fabricante --</option>
                      {brands.map((brand) => (
                        <option key={brand.code} value={brand.code}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    {loadingBrands && <p className="text-[10px] text-amber-500/80 mt-1">Carregando marcas...</p>}
                  </div>

                  {/* Select Model */}
                  <div>
                    <label htmlFor="model-select" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      2. Selecione o Modelo:
                    </label>
                    <select
                      id="model-select"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedBrand || loadingModels}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!selectedBrand ? "Selecione uma marca primeiro" : "-- Selecione o Veículo --"}
                      </option>
                      {models.map((model) => (
                        <option key={model.code} value={model.code}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                    {loadingModels && <p className="text-[10px] text-amber-500/80 mt-1">Carregando modelos...</p>}
                  </div>

                  {/* Select Year */}
                  <div>
                    <label htmlFor="year-select" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      3. Ano Modelo / Combustível:
                    </label>
                    <select
                      id="year-select"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      disabled={!selectedModel || loadingYears}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!selectedModel ? "Selecione o modelo primeiro" : "-- Selecione o Ano --"}
                      </option>
                      {years.map((yr) => (
                        <option key={yr.code} value={yr.code}>
                          {yr.name}
                        </option>
                      ))}
                    </select>
                    {loadingYears && <p className="text-[10px] text-amber-500/80 mt-1">Carregando anos...</p>}
                  </div>
                </div>
              ) : (
                /* TAB 2: DIRECT FIPE CODE SEARCH */
                <div className="space-y-5">
                  <form onSubmit={handleFipeSearch} className="space-y-4">
                    <div>
                      <label htmlFor="fipe-code-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Código FIPE do Caminhão:
                      </label>
                      <div className="flex gap-3">
                        <input
                          id="fipe-code-input"
                          type="text"
                          placeholder="Ex: 501034-9"
                          value={fipeCode}
                          onChange={(e) => handleFipeCodeChange(e.target.value)}
                          maxLength={8}
                          required
                          className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white font-mono placeholder-slate-600 text-sm md:text-base tracking-wider"
                        />
                        <button
                          type="submit"
                          disabled={loadingFipeYears}
                          className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl transition-all cursor-pointer text-xs md:text-sm uppercase tracking-wider flex items-center justify-center min-w-[100px]"
                        >
                          {loadingFipeYears ? "Buscando..." : "Buscar"}
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-1.5">
                        Digite os 7 dígitos numéricos. Ex: 5010349 ou 501034-9.
                      </span>
                    </div>
                  </form>

                  {/* Year Select (Visible only when Fipe Code yields years) */}
                  {fipeYears.length > 0 && (
                    <div className="animate-fadeIn">
                      <label htmlFor="fipe-year-select" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Selecione o Ano do Modelo:
                      </label>
                      <select
                        id="fipe-year-select"
                        value={selectedFipeYear}
                        onChange={(e) => setSelectedFipeYear(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-white text-sm cursor-pointer"
                      >
                        <option value="">-- Selecione o Ano --</option>
                        {fipeYears.map((yr) => (
                          <option key={yr.code} value={yr.code}>
                            {yr.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Reset/Clear selection button */}
              {(selectedBrand || fipeCode || details) && (
                <button
                  onClick={handleClear}
                  className="w-full py-2.5 bg-slate-900/60 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Limpar Consulta
                </button>
              )}

              {error && (
                <div className="bg-red-950/40 border border-red-900/50 text-red-200 px-4 py-3.5 rounded-xl text-xs leading-relaxed">
                  {error}
                </div>
              )}
            </div>

            {/* FIPE Details Card Display (5 Cols) */}
            <div className="lg:col-span-5 h-full">
              {loadingDetails ? (
                /* Loading details state */
                <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-6 md:p-8 text-center min-h-[300px] flex flex-col items-center justify-center gap-4">
                  <div className="w-8 h-8 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                  <p className="text-xs text-slate-400">Buscando cotação atualizada na FIPE...</p>
                </div>
              ) : details ? (
                /* Final result card design */
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[300px] space-y-6 shadow-xl animate-fadeIn">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-widest block">
                      Ficha FIPE Caminhões
                    </span>

                    <div>
                      <span className="text-xs text-slate-400 font-medium block">Preço Médio Estimado:</span>
                      <div className="text-3xl font-extrabold text-white mt-1 select-all">
                        {details.price}
                      </div>
                    </div>

                    <div className="border-t border-slate-800/60 pt-4 space-y-2.5 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Fabricante:</span>
                        <strong className="text-white">{details.brand}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Modelo:</span>
                        <strong className="text-white text-right max-w-[200px] truncate" title={details.model}>
                          {details.model}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Ano Modelo:</span>
                        <strong className="text-white">{details.modelYear}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Combustível:</span>
                        <strong className="text-white">{details.fuel}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Código FIPE:</span>
                        <strong className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 select-all">
                          {details.codeFipe}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3.5 border-t border-slate-800/60 pt-4">
                    <div className="text-[10px] text-slate-500 leading-normal flex items-center justify-between">
                      <span>Mês de referência FIPE:</span>
                      <strong className="text-slate-400 capitalize">{details.referenceMonth}</strong>
                    </div>

                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.print();
                        }
                      }}
                      className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-white/5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Imprimir Ficha FIPE
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty / default state for details panel */
                <div className="bg-slate-950/20 border border-slate-850 border-dashed rounded-2xl p-8 text-center min-h-[300px] flex flex-col items-center justify-center text-slate-500">
                  <span className="text-4xl mb-3 select-none">🚛</span>
                  <h4 className="font-bold text-slate-400 text-sm mb-1">Cotação FIPE</h4>
                  <p className="text-[11px] leading-relaxed max-w-[200px] mx-auto text-slate-550">
                    Selecione a marca, veículo e ano à esquerda (ou busque pelo código FIPE) para visualizar os preços.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Print-Only Template */}
      {details && (
        <PrintReportTemplate
          reportTitle="Ficha de Avaliação da Tabela FIPE (Veículos Pesados)"
          showSignatures={false}
          parameters={[
            { label: "Fabricante / Marca", value: details.brand },
            { label: "Modelo do Veículo", value: details.model },
            { label: "Ano de Fabricação", value: details.modelYear },
            { label: "Tipo de Combustível", value: details.fuel },
            { label: "Mês de Referência da Tabela", value: details.referenceMonth },
          ]}
          results={[
            { label: "Código de Registro FIPE", value: details.codeFipe, isBold: true },
            {
              label: "VALOR DA AVALIAÇÃO FIPE (MÉDIO)",
              value: details.price,
              isHighlight: true,
            },
          ]}
          notes="A Tabela FIPE expressa os preços médios de veículos anunciados pelos vendedores no mercado nacional, servindo apenas como um parâmetro para negociações ou cálculos de indenizações de seguro. O preço de venda real pode variar dependendo do estado de conservação, quilometragem, acessórios e região comercial do caminhão."
        />
      )}
    </>
  );
}
