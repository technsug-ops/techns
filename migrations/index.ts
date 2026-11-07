import * as migration_20261107_005258_initial from './20261107_005258_initial';
import * as migration_20261107_102130_team_und_optionale_url from './20261107_102130_team_und_optionale_url';
import * as migration_20261107_102200_inhalte from './20261107_102200_inhalte';
import * as migration_20261107_102932_lokalisierung from './20261107_102932_lokalisierung';
import * as migration_20261107_103100_uebersetzungen from './20261107_103100_uebersetzungen';

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
    name: '20261107_102932_lokalisierung'
  },
  {
    up: migration_20261107_103100_uebersetzungen.up,
    down: migration_20261107_103100_uebersetzungen.down,
    name: '20261107_103100_uebersetzungen',
  },
];
