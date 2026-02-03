import db from "~~/lib/db";
import { user } from "~~/lib/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const currentUser = event.context.user;

  if (!currentUser) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // GET -Reed preference
  if (event.method === "GET") {
    const result = await db
      .select({ sidebarOpen: user.sidebarOpen })
      .from(user)
      .where(eq(user.id, Number(currentUser.id)))
      .limit(1);

    return { sidebarOpen: result[0]?.sidebarOpen ?? true };
  }

  // PATCH - Update preference
  if (event.method === "PATCH") {
    const body = await readBody(event);

    await db
      .update(user)
      .set({ sidebarOpen: body.sidebarOpen })
      .where(eq(user.id, Number(currentUser.id)));

    return { success: true };
  }

  throw createError({
    statusCode: 405,
    message: "Method Not Allowed",
  });
});
