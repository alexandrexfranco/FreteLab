"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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

      {/* Mobile Menu Panel (rendered absolutely relative to header) */}
      {isOpen && (
        <nav
          aria-label="Navegação móvel"
          className="absolute left-0 right-0 top-16 md:hidden bg-slate-950 border-t border-slate-900 px-4 py-4 space-y-3 flex flex-col text-sm font-medium z-50 animate-fadeIn"
        >
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
    </>
  );
}
