import * as migration_20261105_172611_initial from './20261105_172611_initial';

export const migrations = [
  {
    up: migration_20261105_172611_initial.up,
    down: migration_20261105_172611_initial.down,
    name: '20261105_172611_initial'
  },
];
