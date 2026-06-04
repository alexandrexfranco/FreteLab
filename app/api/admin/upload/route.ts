import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Criar nome de arquivo único
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.name.split(".").pop();
    const filename = `upload-${uniqueSuffix}.${fileExtension}`;
    
    // Configurações do Supabase
    const supabaseUrl = process.env.SUPABASE_URL || "https://xvlsgnfscebwndtbqcbs.supabase.co";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseServiceKey) {
      return NextResponse.json({ 
        error: "Configuração ausente: SUPABASE_SERVICE_ROLE_KEY não configurada no servidor." 
      }, { status: 500 });
    }

    const bucketName = "uploads";
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${bucketName}/${filename}`;

    // Enviar o buffer do arquivo diretamente via REST API do Supabase Storage
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${supabaseServiceKey}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true"
      },
      body: buffer
    });

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      throw new Error(`Supabase Storage respondeu com erro: ${errorText}`);
    }

    // URL pública final do arquivo
    const fileUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filename}`;
    
    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error: any) {
    console.error("Error uploading file to Supabase:", error);
    return NextResponse.json(
      { error: `Erro interno ao fazer upload do arquivo: ${error.message || error}` },
      { status: 500 }
    );
  }
}
