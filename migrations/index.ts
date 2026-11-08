import * as migration_20261107_005258_initial from './20261107_005258_initial';
import * as migration_20261107_102130_team_und_optionale_url from './20261107_102130_team_und_optionale_url';
import * as migration_20261107_102200_inhalte from './20261107_102200_inhalte';
import * as migration_20261107_102932_lokalisierung from './20261107_102932_lokalisierung';
import * as migration_20261107_103100_uebersetzungen from './20261107_103100_uebersetzungen';
import * as migration_20261107_161734_neuordnung from './20261107_161734_neuordnung';
import * as migration_20261108_092118_apps_bereich from './20261108_092118_apps_bereich';
import * as migration_20261108_092200_apps_inhalte from './20261108_092200_apps_inhalte';
import * as migration_20261108_100000_fallstudien from './20261108_100000_fallstudien';
import * as migration_20261108_101500_bezirga_info from './20261108_101500_bezirga_info';

export const migrations = [
  {
    up: migration_20261107_005258_initial.up,
    down: migration_20261107_005258_initial.down,
    name: '20261107_005258_initial',
  },
  {
    up: migration_20261107_102130_team_und_optionale_url.up,
    down: migration_20261107_102130_team_und_optionale_url.down,
    name: '20261107_102130_team_und_optionale_url',
  },
  {
    up: migration_20261107_102200_inhalte.up,
    down: migration_20261107_102200_inhalte.down,
    name: '20261107_102200_inhalte',
  },
  {
    up: migration_20261107_102932_lokalisierung.up,
    down: migration_20261107_102932_lokalisierung.down,
    name: '20261107_102932_lokalisierung',
  },
  {
    up: migration_20261107_103100_uebersetzungen.up,
    down: migration_20261107_103100_uebersetzungen.down,
    name: '20261107_103100_uebersetzungen',
  },
  {
    up: migration_20261107_161734_neuordnung.up,
    down: migration_20261107_161734_neuordnung.down,
    name: '20261107_161734_neuordnung',
  },
  {
    up: migration_20261108_092118_apps_bereich.up,
    down: migration_20261108_092118_apps_bereich.down,
    name: '20261108_092118_apps_bereich'
  },
  {
    up: migration_20261108_092200_apps_inhalte.up,
    down: migration_20261108_092200_apps_inhalte.down,
    name: '20261108_092200_apps_inhalte',
  },
  {
    up: migration_20261108_100000_fallstudien.up,
    down: migration_20261108_100000_fallstudien.down,
    name: '20261108_100000_fallstudien',
  },
  {
    up: migration_20261108_101500_bezirga_info.up,
    down: migration_20261108_101500_bezirga_info.down,
    name: '20261108_101500_bezirga_info',
  },
];
