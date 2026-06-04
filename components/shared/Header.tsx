import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
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

        {/* Mobile menu (Client side) */}
        <MobileMenu />
      </div>
    </header>
  );
}

