import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "O e-mail é obrigatório" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    // Save lead to the database
    // Using upsert so if the email is already registered, we just make it active and don't fail
    const lead = await prisma.newsletterLead.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        active: true,
        source: source || "unknown",
      },
      create: {
        email: email.toLowerCase().trim(),
        source: source || "unknown",
        active: true,
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Error saving newsletter lead:", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar inscrição no banco de dados. Tente novamente." },
      { status: 500 }
    );
  }
}
