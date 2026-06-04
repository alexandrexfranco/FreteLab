"use client";

import { useState } from "react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  published: boolean;
  createdAt: string;
  coverImageUrl?: string | null;
  category: { name: string; slug: string };
  author: { name: string; email: string };
}

interface BlogHubProps {
  initialArticles: Article[];
}

export default function BlogHub({ initialArticles }: BlogHubProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories list
  const categories = Array.from(
    new Set(initialArticles.map((art) => art.category?.name).filter(Boolean))
  );

  // Filter articles
  const filteredArticles = initialArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || art.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search & Categories Nav Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Pesquisar artigos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
          <svg
            className="absolute left-3.5 top-3 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === null
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
            }`}
          >
            Todos
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
          <svg
            className="w-12 h-12 text-slate-300 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-slate-500 italic text-sm">Nenhum artigo encontrado para a busca especificada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 flex flex-col"
            >
              {/* Cover image or fallback colour strip */}
              {art.coverImageUrl ? (
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={art.coverImageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="h-2 w-full bg-gradient-to-r from-primary to-blue-500" />
              )}
              
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category and Date Header */}
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-slate-500">
                    <span className="text-primary">{art.category?.name || "Geral"}</span>
                    <span>{new Date(art.createdAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}</span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-primary transition-colors duration-150 leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h3>
                  
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-primary select-none">
                      FL
                    </div>
                    <span className="font-semibold text-[11px]">{art.author?.name || "Equipe FreteLab"}</span>
                  </div>
                  
                  <Link
                    href={`/blog/${art.slug}`}
                    className="font-bold text-primary hover:text-blue-600 transition-colors flex items-center gap-0.5 group-hover:translate-x-1 transition-transform duration-200"
                  >
                    Ler artigo <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
