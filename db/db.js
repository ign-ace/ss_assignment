import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const DataBase = process.env.DB_NAME;
const UserName = process.env.DB_USER;
const Password = process.env.DB_PASSWORD;
const Host = process.env.DB_HOST;
const Port = process.env.DB_PORT;

const poolConfig = {
  max: 5,
  min: 2,
  idleTimeoutMillis: 600000,
  connectionString: `postgres://${UserName}:${Password}@${Host}:${Port}/${DataBase}`,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(poolConfig);

export default pool;
