import { createPool } from "mysql2/promise.js";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Bboyissei19",
  database: "bat_country_prueba",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
