import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "game_inventory",
  password: "sam@2004",
  port: 5432,
});

const SQL = `
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO categories (name)
VALUES
    ('action'),
    ('racing'),
    ('sports');

`;

async function createTableCategories() {
  try {
    await pool.query(SQL);
  } catch (error) {
    console.log(error);
  }
}

createTableCategories();
