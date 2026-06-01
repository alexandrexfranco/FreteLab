import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Helper to slugify category names
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Erro ao excluir artigo. Verifique a conexão com o banco de dados." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    
    // Support toggle publish state shortcut
    if (body.togglePublish !== undefined) {
      const article = await prisma.article.findUnique({ where: { id } });
      if (!article) {
        return NextResponse.json({ error: "Artigo não encontrado" }, { status: 404 });
      }
      
      const newPublished = !article.published;
      const updated = await prisma.article.update({
        where: { id },
        data: {
          published: newPublished,
          publishedAt: newPublished ? new Date() : null,
        },
      });
      return NextResponse.json({ success: true, article: updated });
    }

    const { title, slug, summary, content, categoryName, published, coverImageUrl, publishedAt } = body;

    if (!title || !slug || !summary || !content || !categoryName) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      );
    }

    const categorySlug = slugify(categoryName);

    // Create or connect category
    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: {
        name: categoryName,
        slug: categorySlug,
      },
    });

    // Update article
    const article = await prisma.article.update({
      where: { id },
      data: {
        title,
        slug: slug.trim().toLowerCase(),
        summary,
        content,
        coverImageUrl: coverImageUrl !== undefined ? (coverImageUrl || null) : undefined,
        published: !!published || !!publishedAt,
        categoryId: category.id,
        publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
        seoTitle: `${title} | FreteLab`,
        seoDesc: summary.slice(0, 160),
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("Error updating article:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Já existe um artigo publicado com esta URL amigável (slug)" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno ao atualizar artigo no banco de dados." },
      { status: 500 }
    );
  }
}
