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

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        author: {
          select: { name: true, email: true },
        },
      },
    });
    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching admin articles:", error);
    // Graceful fallback for local development if database is not active yet
    return NextResponse.json({ articles: [], warning: "Sem conexão com banco de dados" });
  }
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, slug, summary, content, categoryName, published, coverImageUrl, publishedAt } = body;

    if (!title || !slug || !summary || !content || !categoryName) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      );
    }

    // Find the admin author
    const author = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!author) {
      return NextResponse.json(
        { error: "Nenhum usuário administrador cadastrado no banco de dados para vincular o post" },
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

    // Create article
    const article = await prisma.article.create({
      data: {
        title,
        slug: slug.trim().toLowerCase(),
        summary,
        content,
        coverImageUrl: coverImageUrl || null,
        published: !!published || !!publishedAt,
        authorId: author.id,
        categoryId: category.id,
        publishedAt: publishedAt ? new Date(publishedAt) : (published ? new Date() : null),
        seoTitle: `${title} | FreteLab`,
        seoDesc: summary.slice(0, 160),
      },
    });

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error("Error creating article:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Já existe um artigo publicado com esta URL amigável (slug)" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Erro interno ao salvar artigo no banco de dados. Verifique a conexão." },
      { status: 500 }
    );
  }
}
