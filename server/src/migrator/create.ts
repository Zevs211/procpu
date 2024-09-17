import fs from 'fs';
import path from 'path';
import date from '../helpers/date';
import template from './template';

const createMigration = async (): Promise<void> => {
  const fileName = `${date().valueOf()}.ts`;
  const migrationPath = path.join(__dirname, `../migrations/${fileName}`);

  fs.writeFileSync(migrationPath, template);
};

createMigration().catch(error => {
  console.error('Error creating migration:', error);
});