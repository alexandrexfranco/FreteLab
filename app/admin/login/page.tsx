"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        setError(data.error || "Senha inválida.");
      }
    } catch (err) {
      setError("Erro de rede. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <span className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center font-black text-white text-2xl tracking-tighter mx-auto shadow-md">
              FL
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          <p className="text-xs text-slate-400">
            Apenas administradores podem gerenciar artigos no FreteLab.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs py-3 px-4 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha de administrador"
              className="w-full bg-slate-950 text-white border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary transition-colors"
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary-hover text-white font-bold py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 text-sm shadow-lg shadow-secondary/15"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar no Painel"}
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-slate-400 underline transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
