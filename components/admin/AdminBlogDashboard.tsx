"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Load TipTap editor client-side only (uses browser APIs)
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="bg-slate-900 border border-slate-800 rounded-xl min-h-[350px] flex items-center justify-center">
      <p className="text-slate-500 text-sm animate-pulse">Carregando editor...</p>
    </div>
  ),
});

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
  category: { name: string; slug: string };
  author: { name: string; email: string };
}

export default function AdminBlogDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [published, setPublished] = useState(false);
  const [tagsString, setTagsString] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [uploadingCover, setUploadingCover] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Upload cover image
  async function handleCoverImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImageUrl(data.url);
      } else {
        alert(data.error || "Erro ao fazer upload.");
      }
    } catch {
      alert("Erro de conexão ao fazer upload.");
    } finally {
      setUploadingCover(false);
      if (e.target) e.target.value = "";
    }
  }

  // Fetch articles on mount

  useEffect(() => {
    fetchArticles();
  }, []);

  async function fetchArticles() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/posts");
      const data = await res.json();
      if (res.ok) {
        setArticles(data.articles || []);
      } else {
        setError(data.error || "Erro ao carregar artigos.");
      }
    } catch (err) {
      setError("Erro de conexão ao carregar artigos.");
    } finally {
      setLoading(false);
    }
  }

  // Auto-slugify title as the user writes, unless editing or manually modified
  function handleTitleChange(val: string) {
    setTitle(val);
    if (!editingId) {
      const suggestedSlug = val
        .toString()
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setSlug(suggestedSlug);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !slug || !summary || !content || !categoryName) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setSubmitting(true);

    // Strip existing tags/keywords blocks from content to avoid accumulation
    let cleanContent = content.replace(/<!-- (tags|keywords): .*? -->/g, "").trim();
    cleanContent = cleanContent.replace(/<div class="flex flex-wrap gap-2 mt-8 pt-4 border-t border-slate-100 no-print">[\s\S]*?<\/div>/g, "").trim();

    let finalContent = cleanContent;
    if (tagsString.trim()) {
      const tagsList = tagsString
        .split(",")
        .map((t) => t.trim().replace(/^#/, "")) // Strip leading hash if entered
        .filter(Boolean);

      if (tagsList.length > 0) {
        const tagsHtml = `\n<div class="flex flex-wrap gap-2 mt-8 pt-4 border-t border-slate-100 no-print">\n  ${tagsList
          .map((t) => `<span class="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg hover:bg-slate-200 transition-colors">${t}</span>`)
          .join("\n  ")}\n</div>\n<!-- keywords: ${tagsList.join(",")} -->`;
        
        finalContent = cleanContent + "\n" + tagsHtml;
      }
    }

    const payload = { title, slug, summary, content: finalContent, categoryName, published, coverImageUrl: coverImageUrl || null, publishedAt: publishedAt || null };

    try {
      const url = editingId ? `/api/admin/posts/${editingId}` : "/api/admin/posts";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert(editingId ? "Artigo atualizado!" : "Artigo criado com sucesso!");
        resetForm();
        fetchArticles();
      } else {
        alert(data.error || "Erro ao salvar o artigo.");
      }
    } catch (err) {
      alert("Erro de conexão com a API.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleTogglePublish(id: string) {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ togglePublish: true }),
      });

      if (res.ok) {
        fetchArticles();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao alterar status.");
      }
    } catch (err) {
      alert("Erro ao alterar status.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir permanentemente este artigo?")) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchArticles();
        if (editingId === id) resetForm();
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao excluir artigo.");
      }
    } catch (err) {
      alert("Erro de conexão.");
    }
  }

  function handleEdit(art: Article) {
    setEditingId(art.id);
    setTitle(art.title);
    setSlug(art.slug);
    setSummary(art.summary);

    // Extract keywords from content if stored as comment
    const tagsMatch = art.content.match(/<!-- (tags|keywords): (.*?) -->/);
    const extractedTags = tagsMatch ? tagsMatch[2] : "";
    setTagsString(extractedTags);

    // Strip keyword comment tags for clean editing
    const cleanContent = art.content.replace(/<!-- (tags|keywords): .*? -->/g, "").trim();
    setContent(cleanContent);

    setCategoryName(art.category.name);
    setPublished(art.published);
    setPublishedAt(art.publishedAt ? new Date(art.publishedAt).toISOString().slice(0, 16) : "");
    setCoverImageUrl((art as any).coverImageUrl || "");

    // Scroll form into view
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setCategoryName("");
    setTagsString("");
    setCoverImageUrl("");
    setPublishedAt("");
    setPublished(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" }); // clearing session cookie (or similar logout)
    // We can clear cookie on delete or call an API route. 
    // Let's create a logout handler simply by deleting the session cookie on refresh
    document.cookie = "fretelab_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-16">
      {/* Top Header Nav */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-black text-white text-md tracking-tighter">
              FL
            </span>
            <span className="font-extrabold text-md text-white tracking-tight">
              Painel do Administrador
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/blog" target="_blank" className="text-xs hover:text-white underline">
              Ver Blog Público
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer border border-red-500/20"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Create/Edit Form */}
        <section className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-white">
              {editingId ? "Editar Artigo" : "Escrever Novo Artigo"}
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-xs text-slate-400 hover:text-white hover:underline cursor-pointer"
              >
                Cancelar Edição
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Título do Post *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ex: Como calcular frete de retorno"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary text-white"
                required
              />
            </div>

            {/* Slug and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Slug URL *</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="ex-como-calcular-frete"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary text-white"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Categoria *</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ex: Legislação ou Gestão"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary text-white"
                  required
                />
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Resumo / Meta Description *</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Uma breve introdução do post que aparecerá nos cards e nos resultados do Google (máx 250 caracteres)."
                rows={2}
                maxLength={250}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary text-white"
                required
              />
            </div>

            {/* Palavras-chave */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Palavras-chave (separadas por vírgula)</label>
              <input
                type="text"
                value={tagsString}
                onChange={(e) => setTagsString(e.target.value)}
                placeholder="Ex: cálculo de frete, custo por km, diesel, antt, pedágio"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-secondary text-white"
              />
            </div>

            {/* Cover Image / Imagem de Capa */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Imagem de Capa do Artigo</label>
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                {coverImageUrl ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <img
                        src={coverImageUrl}
                        alt="Preview da capa"
                        className="w-full h-40 object-cover rounded-lg border border-slate-700"
                      />
                      <button
                        type="button"
                        onClick={() => setCoverImageUrl("")}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md cursor-pointer transition-all"
                      >
                        × Remover
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{coverImageUrl}</p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center space-y-2">
                    <div className="text-3xl">🖼️</div>
                    <p className="text-xs text-slate-400">Arraste ou selecione uma imagem de capa</p>
                    <p className="text-[10px] text-slate-500">Recomendado: 1200 × 630px, JPG ou WebP</p>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer">
                    <span className="block w-full text-center text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 px-4 rounded-lg transition-all">
                      {uploadingCover ? "Enviando..." : coverImageUrl ? "🔄 Trocar imagem" : "📤 Fazer upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                      disabled={uploadingCover}
                      className="hidden"
                    />
                  </label>
                  {!coverImageUrl && (
                    <input
                      type="url"
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      placeholder="Ou cole uma URL"
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none text-white placeholder-slate-600"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Content — TipTap WYSIWYG Editor */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Conteúdo do Artigo *</label>
              <RichTextEditor
                value={content}
                onChange={setContent}
              />
            </div>

            {/* Published Switch and Submit */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="publish_status"
                    checked={!published && !publishedAt}
                    onChange={() => { setPublished(false); setPublishedAt(""); }}
                    className="rounded-full bg-slate-900 border-slate-800 text-slate-500 focus:ring-slate-500 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-300">Rascunho</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="publish_status"
                    checked={published && !publishedAt}
                    onChange={() => { setPublished(true); setPublishedAt(""); }}
                    className="rounded-full bg-slate-900 border-slate-800 text-green-500 focus:ring-green-500 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-300">Publicar Agora</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="publish_status"
                    checked={!!publishedAt}
                    onChange={() => { setPublished(false); setPublishedAt(new Date(Date.now() + 86400000).toISOString().slice(0, 16)); }}
                    className="rounded-full bg-slate-900 border-slate-800 text-secondary focus:ring-secondary focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-300">Agendar</span>
                </label>
              </div>

              {!!publishedAt && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Data e Hora da Publicação</label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="block w-full max-w-xs bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-secondary text-white"
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-secondary hover:bg-secondary-hover text-white px-5 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 text-sm cursor-pointer"
                >
                  {submitting ? "Salvando..." : editingId ? "Salvar Edição" : "Criar Postagem"}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Right Side: List of Articles */}
        <section className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Lista de Postagens
          </h2>

          {loading ? (
            <p className="text-slate-400 text-xs py-8 text-center">Carregando artigos...</p>
          ) : error ? (
            <div className="text-red-400 bg-red-950/20 border border-red-900/30 text-xs py-4 px-4 rounded-xl text-center">
              {error}
            </div>
          ) : articles.length === 0 ? (
            <p className="text-slate-500 italic text-xs py-8 text-center">Nenhum artigo publicado ainda.</p>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[600px] pr-1">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 rounded-xl p-4 transition-all space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-slate-500 text-[10px] block">
                      {new Date(art.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span
                      onClick={() => handleTogglePublish(art.id)}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full cursor-pointer select-none ${
                        art.published
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                      title="Clique para alternar entre publicado e rascunho"
                    >
                      {art.published ? "Publicado" : "Rascunho"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-white leading-tight mb-1">{art.title}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/40">
                    <span className="text-slate-500 font-medium">
                      📁 {art.category?.name || "Sem categoria"}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(art)}
                        className="text-secondary hover:text-white transition-colors cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(art.id)}
                        className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
