/**
 * Importiert die Startprojekte aus scripts/seed-projects.json.
 * Ausführen mit:  npm run seed   – vorhandene Projekte (gleiches Kürzel) werden übersprungen.
 */
import config from "@payload-config";
import { getPayload } from "payload";
import { seedProjects } from "../lib/seedProjects";

const payload = await getPayload({ config });
const n = await seedProjects(payload);
payload.logger.info(`Fertig – ${n} neue Projekte.`);
process.exit(0);
