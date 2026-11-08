import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_projects_group" ADD VALUE 'apps';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects" ALTER COLUMN "group" SET DATA TYPE text;
  ALTER TABLE "projects" ALTER COLUMN "group" SET DEFAULT 'websites'::text;
  DROP TYPE "public"."enum_projects_group";
  CREATE TYPE "public"."enum_projects_group" AS ENUM('erp', 'websites');
  ALTER TABLE "projects" ALTER COLUMN "group" SET DEFAULT 'websites'::"public"."enum_projects_group";
  ALTER TABLE "projects" ALTER COLUMN "group" SET DATA TYPE "public"."enum_projects_group" USING "group"::"public"."enum_projects_group";`)
}
