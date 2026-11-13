import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/** MentörDE und Hausaufgaben-Kompass werden auf der Website ausgeblendet (bleiben im Panel erhalten). */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`UPDATE "projects" SET "visible" = false WHERE "slug" IN ('mentorde', 'kompass');`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`UPDATE "projects" SET "visible" = true WHERE "slug" IN ('mentorde', 'kompass');`);
}
