import Database from 'better-sqlite3';
import path from 'path';

// Create or open the database file
const dbPath = path.join(process.cwd(), 'connexta.db');
const db = new Database(dbPath, { verbose: console.log });

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS system_status (
    id INTEGER PRIMARY KEY,
    active_users INTEGER,
    system_health TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  INSERT OR IGNORE INTO system_status (id, active_users, system_health) VALUES (1, 42, '99%');
`);

export default db;
