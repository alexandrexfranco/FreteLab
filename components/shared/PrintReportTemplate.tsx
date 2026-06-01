import React from "react";

interface ReportItem {
  label: string;
  value: string | number;
  isBold?: boolean;
  isHighlight?: boolean;
}

interface PrintReportTemplateProps {
  reportTitle: string;
  parameters: ReportItem[];
  results: ReportItem[];
  showSignatures?: boolean;
  notes?: string;
}

export default function PrintReportTemplate({
  reportTitle,
  parameters,
  results,
  showSignatures = true,
  notes,
}: PrintReportTemplateProps) {
  return (
    <div className="print-only max-w-3xl mx-auto bg-white text-slate-950 p-8 border border-slate-350 rounded shadow-sm space-y-8 font-sans">
      {/* Document Header */}
      <div className="flex justify-between items-center border-b-2 border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-extrabold uppercase tracking-wide text-slate-900">FreteLab</h2>
          <span className="text-xs text-slate-500">Relatório de Cálculo Técnico</span>
        </div>
        <div className="text-right text-xs text-slate-500 space-y-1">
          <div>Data: {new Date().toLocaleDateString("pt-BR")}</div>
          <div className="text-[10px] text-slate-400">Calculado em fretelab.com.br</div>
        </div>
      </div>

      {/* Report Title */}
      <h3 className="text-base font-bold text-center uppercase tracking-wider py-2.5 bg-slate-100 border border-slate-200 text-slate-800 rounded-md">
        {reportTitle}
      </h3>

      {/* Section 1: Inputs/Parameters */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-widest border-l-4 border-slate-800 pl-2">
          1. Parâmetros Informados (Entradas)
        </h4>
        <table className="w-full text-xs text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-bold">
              <th className="border border-slate-200 p-2.5">Descrição da Variável</th>
              <th className="border border-slate-200 p-2.5 text-right w-1/3">Valor</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((item, idx) => (
              <tr key={idx}>
                <td className="border border-slate-200 p-2.5">{item.label}</td>
                <td className="border border-slate-200 p-2.5 text-right font-medium">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Section 2: Outputs/Results */}
      <div className="space-y-3">
        <h4 className="font-bold text-xs text-slate-700 uppercase tracking-widest border-l-4 border-slate-800 pl-2">
          2. Resultados Projetados (Saídas)
        </h4>
        <table className="w-full text-xs text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-50 text-slate-600 font-bold">
              <th className="border border-slate-200 p-2.5">Composição e Métricas</th>
              <th className="border border-slate-200 p-2.5 text-right w-1/3">Valor Calculado</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => {
              let rowClass = "";
              if (item.isHighlight) {
                rowClass = "bg-emerald-50/50 text-emerald-900 font-bold";
              } else if (item.isBold) {
                rowClass = "font-bold bg-slate-50";
              }
              return (
                <tr key={idx} className={rowClass}>
                  <td className="border border-slate-200 p-2.5">{item.label}</td>
                  <td className="border border-slate-200 p-2.5 text-right">{item.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {notes && (
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-md text-xs text-slate-600 leading-normal">
          <strong className="block mb-1 text-slate-700">Notas e Observações Adicionais:</strong>
          {notes}
        </div>
      )}

      {/* Section 3: Signature fields (Optional) */}
      {showSignatures && (
        <div className="grid grid-cols-2 gap-8 pt-12 text-xs">
          <div className="text-center space-y-1">
            <div className="border-b border-slate-300 h-6"></div>
            <span className="text-slate-500 block">Responsável Técnico / Motorista</span>
          </div>
          <div className="text-center space-y-1">
            <div className="border-b border-slate-300 h-6"></div>
            <span className="text-slate-500 block">Destinatário / Embarcador</span>
          </div>
        </div>
      )}

      {/* Document Footer Disclaimer */}
      <div className="border-t border-slate-200 pt-6 text-[9px] text-slate-400 leading-relaxed text-center">
        <strong>Aviso de Isenção:</strong> Este relatório é gerado automaticamente com caráter estimativo baseado nos parâmetros
        de livre digitação informados pelo usuário. O FreteLab não garante eficácia legal ou comercial dos dados expressos
        e recomenda a auditoria antes da assinatura de contratos.
      </div>
    </div>
  );
}
