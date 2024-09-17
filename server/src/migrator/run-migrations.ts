import { readdirSync } from 'fs';
import Bluebird from 'bluebird';
import { Pool, QueryResult } from 'pg';
import { join } from 'path';
import config from '../database/config';

const MIGRATIONS_DIR = join(__dirname, '../migrations');

let pool: Pool | null = null;
pool = new Pool(config);

interface Migration {
  id: number;
  name: string;
}

const runMigration = async (fileName: string): Promise<void> => {
  try {
    const migrationPath = join(MIGRATIONS_DIR, `${fileName}.ts`);
    const migrationModule = await import(migrationPath);
    if (typeof migrationModule.upsert === 'function') {
      await migrationModule.upsert(pool);
      console.log(`Migration ${fileName} executed successfully.`);
    } else {
      console.error(`Migration ${fileName} does not have an 'up' function.`);
    }
  } catch (error) {
    console.error(`Error executing migration ${fileName}:`, error);
    throw error;
  }
};

const createMigrationsTable = async (): Promise<void> => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP NOT NULL DEFAULT NOW(),
        status VARCHAR(50) NOT NULL
      );
    `;
    await pool.query(createTableQuery);
    console.log('Table "migrations" created successfully.');
  } catch (error) {
    console.error('Error creating "migrations" table:', error);
    throw error;
  }
};

const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const res: QueryResult = await pool.query(
      'SELECT 1 FROM information_schema.tables WHERE table_schema = \'public\' AND table_name = $1',
      [tableName],
    );
    return (res.rowCount ?? 0) > 0;
  } catch (error) {
    console.error(`Error checking if table "${tableName}" exists:`, error);
    throw error;
  }
};

const getMigrationsFromDb = async (): Promise<Migration[]> => {
  try {
    const query = 'SELECT * FROM migrations;';
    const res: QueryResult = await pool.query(query);
    return res.rows;
  } catch (error) {
    console.error('Error migration list not received:', error);
    throw error;
  }
};

const addMigrationToDb = async (migrationName: string): Promise<void> => {
  try {
    const query = `
      INSERT INTO migrations (name, executed_at, status)
      VALUES ($1, NOW(), 'executed');
    `;
    const values = [migrationName];

    await pool.query(query, values);
    console.log(`Migration "${migrationName}" added to database.`);
  } catch (error) {
    console.error('Error adding migration:', error);
    throw error;
  }
};

const migrationsForExecution = async () => {
  try {
    const migrationFileNames = readdirSync(MIGRATIONS_DIR).map(file => {
      return file.replace(/\.ts$/, '');
    });
    const tableExists = await checkTableExists('migrations');
    if (!tableExists) {
      await createMigrationsTable();
    }
    const completedMigrations = await getMigrationsFromDb();
    const completedMigrationNames = completedMigrations.map(migration => migration.name);

    const migrationListForExecution = migrationFileNames.filter(
      fileName => !completedMigrationNames.includes(fileName),
    );

    if (migrationListForExecution.length === 0) {
      console.log('All migrations were executed');
    }
    return migrationListForExecution;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const run = async () => {
  try {
    await pool.connect();
    const migrationListForExecution = await migrationsForExecution();
    console.log(migrationListForExecution, '---------migrationListForExecution');

    await Bluebird.mapSeries(migrationListForExecution, async (migration) => {
      await runMigration(migration);
      await addMigrationToDb(migration);
    });
    await pool.end();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

run();