import { writeFile } from "node:fs/promises";
import path from "node:path";
import { contentPages } from "@/content";

// Só grava em desenvolvimento: em produção o conteúdo vem do JSON commitado.
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ page: string }> },
) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }
  const { page } = await params;
  if (!Object.hasOwn(contentPages, page)) {
    return Response.json({ error: "Página desconhecida" }, { status: 404 });
  }
  const body: unknown = await request.json().catch(() => null);
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }
  const file = path.join(process.cwd(), "content", `${page}.json`);
  await writeFile(file, JSON.stringify(body, null, 2) + "\n", "utf8");
  return Response.json({ ok: true });
}
