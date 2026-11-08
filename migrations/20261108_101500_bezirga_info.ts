import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/** Bezirga verlinkt auf die Infoseite statt auf die Login-Startseite. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`UPDATE "projects" SET "url" = 'https://www.bezirga.com/info', "display_domain" = COALESCE(NULLIF("display_domain", ''), 'bezirga.com') WHERE "slug" = 'bezirga';`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`UPDATE "projects" SET "url" = 'https://bezirga.com' WHERE "slug" = 'bezirga';`);
}
