"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 text-white border-b border-slate-800 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group focus:outline-none">
          <span className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary-hover flex items-center justify-center font-black text-white text-lg tracking-tighter">
            FL
          </span>
          <span className="font-extrabold text-lg tracking-tight group-hover:text-secondary transition-colors duration-150">
            FreteLab
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Navegação principal" className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          <Link href="/ferramentas/calculadora-frete" className="hover:text-secondary transition-colors">
            Calcular Frete
          </Link>
          <Link href="/ferramentas/calculadora-custo-operacional" className="hover:text-secondary transition-colors">
            Custo Operacional
          </Link>
          <Link href="/ferramentas/calculadora-cubagem" className="hover:text-secondary transition-colors">
            Cubagem
          </Link>
          <Link href="/ferramentas/calculadora-antt" className="hover:text-secondary transition-colors">
            Tabela ANTT
          </Link>
          <Link href="/blog" className="hover:text-secondary transition-colors">
            Blog
          </Link>
          <Link
            href="/sobre"
            className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-secondary hover:bg-slate-800 transition-all text-xs"
          >
            Sobre Nós
          </Link>
        </nav>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Abrir menu de navegação"
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary/40 rounded-lg cursor-pointer"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <nav aria-label="Navegação móvel" className="md:hidden bg-slate-950 border-t border-slate-900 px-4 py-4 space-y-3 flex flex-col text-sm font-medium">
          <Link
            href="/ferramentas/calculadora-frete"
            onClick={() => setIsOpen(false)}
            className="hover:text-secondary py-2 border-b border-slate-900"
          >
            Calcular Frete
          </Link>
          <Link
            href="/ferramentas/calculadora-custo-operacional"
            onClick={() => setIsOpen(false)}
            className="hover:text-secondary py-2 border-b border-slate-900"
          >
            Custo Operacional
          </Link>
          <Link
            href="/ferramentas/calculadora-cubagem"
            onClick={() => setIsOpen(false)}
            className="hover:text-secondary py-2 border-b border-slate-900"
          >
            Cubagem
          </Link>
          <Link
            href="/ferramentas/calculadora-antt"
            onClick={() => setIsOpen(false)}
            className="hover:text-secondary py-2 border-b border-slate-900"
          >
            Tabela ANTT
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="hover:text-secondary py-2 border-b border-slate-900"
          >
            Blog
          </Link>
          <Link
            href="/sobre"
            onClick={() => setIsOpen(false)}
            className="hover:text-secondary py-2 font-bold"
          >
            Sobre o FreteLab
          </Link>
        </nav>
      )}
    </header>
  );
}
