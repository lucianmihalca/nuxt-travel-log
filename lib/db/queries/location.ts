import { and, desc, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";

import type { InsertLocation } from "../schema";

import db from "..";
import { location, locationLog } from "../schema";

// Generador de IDs cortos para el slug únicos.
const nanoId = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

// Buscar UNA location por slug + userId (con sus logs relacionados)
export async function findLocation(slug: string, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.slug, slug),
      eq(location.userId, userId),
    ),
    with: {
      locationLogs: {
        orderBy: desc(locationLog.startedAt),
      },
    },
  });
}

// Listar TODAS las locations de un usuario
export async function findLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

// Buscar por nombre (para validar duplicados)
export async function findLocationByName(
  existing: InsertLocation,
  userId: number,
) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  });
}

// Buscar por slug (para generar slugs únicos)
export async function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

// Generar un slug único — si ya existe, le añade un sufijo random
export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));
  while (existing) {
    const id = nanoId();
    const idSlug = `${slug}-${id}`;
    existing = !!(await findLocationBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }
  return slug;
}

// Insertar nueva location
export async function insertLocation(
  insertable: InsertLocation,
  slug: string,
  userId: number,
) {
  const [created] = await db.insert(location).values({
    ...insertable,
    slug,
    userId,
  }).returning();
  return created;
}

// Actualizar por slug
export async function updateLocationBySlug(
  updates: InsertLocation,
  slug: string,
  userId: number,
) {
  const [updated] = await db.update(location).set(updates).where(
    and(
      eq(location.slug, slug),
      eq(location.userId, userId),

    ),
  ).returning();
  return updated;
}
// Eliminar por slug
export async function removeLocationBySlug(
  slug: string,
  userId: number,
) {
  const [removed] = await db.delete(location).where(
    and(
      eq(location.slug, slug),
      eq(location.userId, userId),
    ),
  ).returning();
  return removed;
}
