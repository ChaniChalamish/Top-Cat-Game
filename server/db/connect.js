import { newDb } from "pg-mem";

const db = newDb();
export let pool;

export async function initDb() {
  const adapter = db.adapters.createPg();
  pool = new adapter.Pool(); // עובד כמו pg.Pool רגיל

  // צור את טבלת המשתמשים
  await pool.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      image TEXT,
      score INTEGER DEFAULT 0
    );
  `);

  console.log("✅ In-memory PostgreSQL started");

}
