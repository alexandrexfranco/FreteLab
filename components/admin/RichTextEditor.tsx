"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import { Link } from "@tiptap/extension-link";
import { Image as ImageExt } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { useEffect, useRef, useState, useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

// ─── Toolbar Button ─────────────────────────────────────────────────────────
function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer select-none whitespace-nowrap ${
        active
          ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
          : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
      } disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-5 bg-slate-700 mx-0.5 self-center shrink-0" />;
}

function ToolbarSection({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1 flex-wrap">{children}</div>;
}

// ─── Main Editor Component ───────────────────────────────────────────────────
export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showTableMenu, setShowTableMenu] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const isExternalUpdate = useRef(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        // Disable codeBlock from StarterKit to configure separately
      }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-orange-400 underline underline-offset-2" },
      }),
      ImageExt.configure({
        HTMLAttributes: {
          class: "rounded-xl my-6 max-w-full shadow-md border border-slate-700",
        },
      }),
      Placeholder.configure({
        placeholder:
          "Cole aqui texto do ChatGPT, Google Docs ou Word — títulos, negrito, listas e tabelas serão preservados automaticamente!",
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      if (!isExternalUpdate.current) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: "rich-editor-content focus:outline-none",
        spellcheck: "true",
      },
    },
  });

  // Sync value from parent when editing an existing article (no infinite loop)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      isExternalUpdate.current = true;
      editor.commands.setContent(value || "", false);
      isExternalUpdate.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Track if cursor is inside a table
  useEffect(() => {
    if (!editor) return;
    const update = () => setShowTableMenu(editor.isActive("table"));
    editor.on("selectionUpdate", update);
    editor.on("update", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("update", update);
    };
  }, [editor]);

  // Set link
  const setLink = useCallback(() => {
    if (!editor) return;
    const current = editor.getAttributes("link").href || "";
    const url = window.prompt("URL do link (deixe vazio para remover):", current || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  }, [editor]);

  // Insert table
  const insertTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  // Image upload
  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        const alt =
          window.prompt(
            "Texto alternativo da imagem (para SEO e acessibilidade):",
            file.name.replace(/\.[^.]+$/, "")
          ) || "Imagem do artigo";
        editor.chain().focus().setImage({ src: data.url, alt }).run();
      } else {
        alert(data.error || "Erro ao fazer upload da imagem.");
      }
    } catch {
      alert("Erro de conexão ao fazer upload.");
    } finally {
      setUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = "";
    }
  }

  if (!editor) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-xl min-h-[350px] flex items-center justify-center">
        <p className="text-slate-500 text-sm animate-pulse">Carregando editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Hidden image input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageFile}
      />

      {/* ─── Toolbar ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-x-1 gap-y-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2">
        {/* Format */}
        <ToolbarSection>
          <Btn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Negrito (Ctrl+B)"
          >
            <b>B</b>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Itálico (Ctrl+I)"
          >
            <i>I</i>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Sublinhado (Ctrl+U)"
          >
            <u>U</u>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Tachado"
          >
            <s>S</s>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Código inline"
          >
            <span className="font-mono text-[10px]">`code`</span>
          </Btn>
        </ToolbarSection>

        <Sep />

        {/* Headings */}
        <ToolbarSection>
          <Btn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Título H2 — seção principal"
          >
            H2
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Título H3 — subseção"
          >
            H3
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            active={editor.isActive("heading", { level: 4 })}
            title="Título H4"
          >
            H4
          </Btn>
        </ToolbarSection>

        <Sep />

        {/* Lists */}
        <ToolbarSection>
          <Btn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Lista com marcadores"
          >
            • Lista
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Lista numerada"
          >
            1. Lista
          </Btn>
        </ToolbarSection>

        <Sep />

        {/* Blocks */}
        <ToolbarSection>
          <Btn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Citação"
          >
            ❝ Citação
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Bloco de código"
          >
            {"</>"}
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Linha separadora"
          >
            ─ Separador
          </Btn>
        </ToolbarSection>

        <Sep />

        {/* Alignment */}
        <ToolbarSection>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Alinhar à esquerda"
          >
            ⬅
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Centralizar"
          >
            ☰
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Alinhar à direita"
          >
            ➡
          </Btn>
        </ToolbarSection>

        <Sep />

        {/* Media & Special */}
        <ToolbarSection>
          <Btn onClick={setLink} active={editor.isActive("link")} title="Inserir/editar link">
            🔗 Link
          </Btn>
          <Btn
            onClick={() => imageInputRef.current?.click()}
            disabled={uploadingImage}
            title="Fazer upload de imagem"
          >
            {uploadingImage ? "⏳ Upload..." : "🖼️ Imagem"}
          </Btn>
          <Btn onClick={insertTable} title="Inserir tabela 3×3">
            ⊞ Tabela
          </Btn>
        </ToolbarSection>

        {/* Table controls — appear only when cursor is inside a table */}
        {showTableMenu && (
          <>
            <Sep />
            <ToolbarSection>
              <span className="text-[10px] text-slate-500 self-center pr-1">Tabela:</span>
              <Btn
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                title="Adicionar coluna à esquerda"
              >
                ←+Col
              </Btn>
              <Btn
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                title="Adicionar coluna à direita"
              >
                +Col→
              </Btn>
              <Btn
                onClick={() => editor.chain().focus().deleteColumn().run()}
                title="Remover coluna"
              >
                −Col
              </Btn>
              <Btn
                onClick={() => editor.chain().focus().addRowBefore().run()}
                title="Adicionar linha acima"
              >
                ↑+Lin
              </Btn>
              <Btn
                onClick={() => editor.chain().focus().addRowAfter().run()}
                title="Adicionar linha abaixo"
              >
                +Lin↓
              </Btn>
              <Btn
                onClick={() => editor.chain().focus().deleteRow().run()}
                title="Remover linha"
              >
                −Lin
              </Btn>
              <Btn
                onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                title="Alternar linha de cabeçalho"
              >
                Cabeçalho
              </Btn>
              <Btn
                onClick={() => editor.chain().focus().deleteTable().run()}
                title="Remover tabela inteira"
              >
                🗑️ Tabela
              </Btn>
            </ToolbarSection>
          </>
        )}

        {/* Undo/Redo */}
        <div className="ml-auto flex items-center gap-1">
          <Btn
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Desfazer (Ctrl+Z)"
          >
            ↩ Desfazer
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Refazer (Ctrl+Y)"
          >
            Refazer ↪
          </Btn>
        </div>
      </div>

      {/* ─── Editor Content Area ──────────────────────────────── */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden focus-within:border-orange-500/50 transition-colors duration-200">
        <EditorContent editor={editor} />
      </div>

      <p className="text-[10px] text-slate-500 leading-relaxed">
        ✨{" "}
        <strong className="text-slate-400">Colagem inteligente:</strong> Copie texto do ChatGPT,
        Google Docs ou Word e cole aqui — títulos, negrito, listas, tabelas e links são
        preservados automaticamente. O que você vê é o que aparece no site.
      </p>
    </div>
  );
}
