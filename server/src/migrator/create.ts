import fs from 'fs';
import path from 'path';
import date from '../helpers/date';

const createMigration = async (): Promise<void> => {
  const fileName = `${date().valueOf()}.js`;
  const migrationPath = path.join(__dirname, `../migrations/${fileName}`);

  fs.writeFileSync(migrationPath, 'iii');
};

createMigration().catch(error => {
  console.error('Error creating migration:', error);
});