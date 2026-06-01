import { NextRequest, NextResponse } from "next/server";
import { setAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD || "freteadmin123";

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Senha incorreta" },
        { status: 401 }
      );
    }

    // Auto-seeding: Ensure an ADMIN user exists in the database
    // to link with blog articles as their author.
    try {
      await prisma.user.upsert({
        where: { email: "admin@fretelab.com.br" },
        update: {},
        create: {
          email: "admin@fretelab.com.br",
          name: "Administrador FreteLab",
          passwordHash: "env-password",
          role: "ADMIN",
        },
      });
    } catch (dbError) {
      console.warn("Database connection warning during auto-seeding:", dbError);
      // We continue even if the database is not ready, to allow frontend transitions
    }

    await setAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
