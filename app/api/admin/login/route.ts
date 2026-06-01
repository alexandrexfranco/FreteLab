import { NextRequest, NextResponse } from "next/server";
import { setAdminSession, clearAdminSession, verifyPassword, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Auto-seeding: Ensure an ADMIN user exists in the database
    // to link with blog articles as their author.
    try {
      const adminExists = await prisma.user.findFirst({
        where: { role: "ADMIN" }
      });

      if (!adminExists) {
        const defaultPassword = process.env.ADMIN_PASSWORD || "freteadmin123";
        const hashedPassword = hashPassword(defaultPassword);
        
        await prisma.user.create({
          data: {
            email: "admin@fretelab.com.br",
            name: "Administrador FreteLab",
            passwordHash: hashedPassword,
            role: "ADMIN",
          },
        });
        console.log("Default admin user auto-seeded successfully");
      }
    } catch (dbError) {
      console.warn("Database connection warning during auto-seeding:", dbError);
    }

    // Look up the user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais incorretas ou usuário não encontrado" },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN" && user.role !== "EXPERT") {
      return NextResponse.json(
        { error: "Acesso não autorizado para esta conta" },
        { status: 403 }
      );
    }

    // Verify the password
    const isPasswordCorrect = verifyPassword(password, user.passwordHash);
    
    // Fallback: If passwordHash is currently "env-password" (from previous mocking),
    // and the input password matches the current environment variable password,
    // let's update it to a proper hash and allow the login.
    let authenticated = isPasswordCorrect;
    if (!authenticated && user.passwordHash === "env-password") {
      const adminEnvPassword = process.env.ADMIN_PASSWORD || "freteadmin123";
      if (password === adminEnvPassword) {
        // Update user password to a secure hash
        await prisma.user.update({
          where: { id: user.id },
          data: { passwordHash: hashPassword(password) }
        });
        authenticated = true;
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { error: "Credenciais incorretas" },
        { status: 401 }
      );
    }

    await setAdminSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await clearAdminSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao efetuar logout" },
      { status: 500 }
    );
  }
}
