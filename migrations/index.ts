import * as migration_20261107_005258_initial from './20261107_005258_initial';
import * as migration_20261107_102130_team_und_optionale_url from './20261107_102130_team_und_optionale_url';
import * as migration_20261107_102200_inhalte from './20261107_102200_inhalte';

export const migrations = [
  {
    up: migration_20261107_005258_initial.up,
    down: migration_20261107_005258_initial.down,
    name: '20261107_005258_initial',
  },
  {
    up: migration_20261107_102130_team_und_optionale_url.up,
    down: migration_20261107_102130_team_und_optionale_url.down,
    name: '20261107_102130_team_und_optionale_url'
  },
  {
    up: migration_20261107_102200_inhalte.up,
    down: migration_20261107_102200_inhalte.down,
    name: '20261107_102200_inhalte',
  },
];
