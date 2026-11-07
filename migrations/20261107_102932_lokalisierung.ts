import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Lokalisierung DE/EN/TR – bestehende Inhalte werden vor dem Umbau als Deutsch ('de') übernommen.
 * (Die automatisch erzeugte Fassung hätte die Spalten ohne Datenübernahme gelöscht.)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."_locales" AS ENUM('de', 'en', 'tr');

  CREATE TABLE "projects_locales" (
  	"meta" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"metric" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  CREATE TABLE "team_locales" (
  	"role" varchar NOT NULL,
  	"bio" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );

  -- 1) Bestehende Texte als Deutsch übernehmen
  INSERT INTO "projects_locales" ("meta", "description", "metric", "_locale", "_parent_id")
    SELECT "meta", "description", "metric", 'de', "id" FROM "projects";
  INSERT INTO "team_locales" ("role", "bio", "_locale", "_parent_id")
    SELECT "role", "bio", 'de', "id" FROM "team";

  -- 2) Fallstudien-Blöcke: vorhandene Zeilen sind Deutsch
  ALTER TABLE "projects_blocks_text" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'de';
  ALTER TABLE "projects_blocks_list" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'de';
  ALTER TABLE "projects_blocks_flow_steps" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'de';
  ALTER TABLE "projects_blocks_flow" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'de';
  ALTER TABLE "projects_blocks_text" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "projects_blocks_list" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "projects_blocks_flow_steps" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "projects_blocks_flow" ALTER COLUMN "_locale" DROP DEFAULT;

  -- 3) Mehrfach-Texte: lokalisierte Felder als Deutsch markieren, „stack“ bleibt sprachneutral
  ALTER TABLE "projects_texts" ADD COLUMN "locale" "_locales";
  ALTER TABLE "team_texts" ADD COLUMN "locale" "_locales";
  UPDATE "projects_texts" SET "locale" = 'de' WHERE "path" <> 'stack';
  UPDATE "team_texts" SET "locale" = 'de' WHERE "path" = 'focus';

  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "team_locales" ADD CONSTRAINT "team_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "team_locales_locale_parent_id_unique" ON "team_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "team_locales_parent_id_idx" ON "team_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_locale_idx" ON "projects_blocks_text" USING btree ("_locale");
  CREATE INDEX "projects_blocks_list_locale_idx" ON "projects_blocks_list" USING btree ("_locale");
  CREATE INDEX "projects_blocks_flow_steps_locale_idx" ON "projects_blocks_flow_steps" USING btree ("_locale");
  CREATE INDEX "projects_blocks_flow_locale_idx" ON "projects_blocks_flow" USING btree ("_locale");
  CREATE INDEX "projects_texts_locale_parent" ON "projects_texts" USING btree ("locale","parent_id");
  CREATE INDEX "team_texts_locale_parent" ON "team_texts" USING btree ("locale","parent_id");

  -- 4) Erst jetzt die alten Spalten entfernen
  ALTER TABLE "projects" DROP COLUMN "meta";
  ALTER TABLE "projects" DROP COLUMN "description";
  ALTER TABLE "projects" DROP COLUMN "metric";
  ALTER TABLE "team" DROP COLUMN "role";
  ALTER TABLE "team" DROP COLUMN "bio";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "team_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "team_locales" CASCADE;
  DROP INDEX "projects_blocks_text_locale_idx";
  DROP INDEX "projects_blocks_list_locale_idx";
  DROP INDEX "projects_blocks_flow_steps_locale_idx";
  DROP INDEX "projects_blocks_flow_locale_idx";
  DROP INDEX "projects_texts_locale_parent";
  DROP INDEX "team_texts_locale_parent";
  ALTER TABLE "projects" ADD COLUMN "meta" varchar NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "description" varchar NOT NULL;
  ALTER TABLE "projects" ADD COLUMN "metric" varchar;
  ALTER TABLE "team" ADD COLUMN "role" varchar NOT NULL;
  ALTER TABLE "team" ADD COLUMN "bio" varchar;
  ALTER TABLE "projects_blocks_text" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_list" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_flow_steps" DROP COLUMN "_locale";
  ALTER TABLE "projects_blocks_flow" DROP COLUMN "_locale";
  ALTER TABLE "projects_texts" DROP COLUMN "locale";
  ALTER TABLE "team_texts" DROP COLUMN "locale";
  DROP TYPE "public"."_locales";`)
}
