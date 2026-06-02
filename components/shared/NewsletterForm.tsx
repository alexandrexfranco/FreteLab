"use client";

import { useState } from "react";

interface NewsletterFormProps {
  source?: string;
}

export default function NewsletterForm({ source = "homepage" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: source,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Erro ao realizar cadastro.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Erro de rede. Verifique sua conexão.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-4 text-emerald-300 text-sm text-center font-medium animate-fadeIn">
        ✓ Inscrição realizada com sucesso! Obrigado por se cadastrar.
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
        <input
          type="email"
          placeholder="Seu melhor e-mail"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow px-4 py-3 bg-white text-slate-900 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-sm"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          className="bg-secondary hover:bg-secondary-hover text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer text-sm disabled:opacity-50 flex items-center justify-center min-w-[110px]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      
      {status === "error" && (
        <span className="text-xs text-red-400 mt-2 block font-medium">
          {errorMessage}
        </span>
      )}
      
      <span className="text-[10px] text-blue-200 mt-2 block">
        Respeitamos sua privacidade. Cancele sua inscrição quando desejar.
      </span>
    </div>
  );
}
