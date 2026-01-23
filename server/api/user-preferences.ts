import { auth } from "~~/lib/auth";
import db from "~~/lib/db";
import { user } from "~~/lib/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  // Verificar sesión
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: "No autorizado",
    });
  }

  // GET - Leer preferencia
  if (event.method === "GET") {
    const result = await db
      .select({ sidebarOpen: user.sidebarOpen })
      .from(user)
      .where(eq(user.id, Number(session.user.id)))
      .limit(1);

    return { sidebarOpen: result[0]?.sidebarOpen ?? true };
  }

  // PATCH - Actualizar preferencia
  if (event.method === "PATCH") {
    const body = await readBody(event);

    await db
      .update(user)
      .set({ sidebarOpen: body.sidebarOpen })
      .where(eq(user.id, Number(session.user.id)));

    return { success: true };
  }

  throw createError({
    statusCode: 405,
    message: "Método no permitido",
  });
});
