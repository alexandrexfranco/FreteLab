import { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  seoContent: ReactNode;
  faqSection: ReactNode;
}

export default function CalculatorLayout({
  title,
  description,
  children,
  seoContent,
  faqSection,
}: CalculatorLayoutProps) {
  return (
    <article className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header Title Section */}
        <header className="mb-8 md:mb-12 text-left no-print">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {title}
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed">
            {description}
          </p>
        </header>

        {/* Operational Calculator Panel */}
        <div className="mb-12 md:mb-16">
          {children}
        </div>

        {/* Explanatory SEO Block */}
        <section className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200/80 shadow-sm mb-12 prose prose-slate max-w-none no-print">
          <div className="text-slate-700 leading-relaxed space-y-6">{seoContent}</div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200/80 shadow-sm no-print">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 mb-8 flex items-center gap-2">
            <span className="w-3 h-6 bg-primary rounded-full inline-block"></span>
            Perguntas Frequentes
          </h2>
          <div className="divide-y divide-slate-100">{faqSection}</div>
        </section>
      </div>
    </article>
  );
}
