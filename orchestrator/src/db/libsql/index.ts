import { createClient } from '@libsql/client';
import { TABLE } from './helpers';
import { CONFIG } from 'src/config';

export const libSQLClient = createClient({
  url: CONFIG.LIBSQL_DB_URI,
  authToken: CONFIG.LIBSQL_DB_TOKEN,
});

(async () => {
  await libSQLClient.execute(`
    CREATE TABLE IF NOT EXISTS ${TABLE.USERS} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await libSQLClient.execute(`
    CREATE TABLE IF NOT EXISTS ${TABLE.AUTH} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id) REFERENCES ${TABLE.USERS} (id) ON DELETE CASCADE
    )
  `);
})();
