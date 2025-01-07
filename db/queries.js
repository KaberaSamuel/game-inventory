import pool from "./pool.js";

const categoriesTableSQL = `
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR,
    about VARCHAR,
    imagePath VARCHAR

);
`;

const itemsTableSQL = `
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR,
    price VARCHAR,
    rating VARCHAR,
    publisher VARCHAR,
    release_date DATE,
    units VARCHAR,
    logo VARCHAR,
    image VARCHAR,
    about TEXT,
    genres VARCHAR
);
`;

async function createTable(sql) {
  try {
    await pool.query(sql);
  } catch (error) {
    console.log(error);
  }
}

async function deleteTable(tableName) {
  await pool.query(`DROP TABLE ${tableName};`);
}

async function getAllCategories() {
  try {
    const { rows: categoriesArray } = await pool.query(
      "SELECT * FROM categories"
    );
    return categoriesArray;
  } catch (error) {
    console.log(error);
  }
}

async function getAllItems() {
  try {
    const { rows: itemsArray } = await pool.query("SELECT * FROM items");
    return itemsArray;
  } catch (error) {
    console.log(error);
  }
}

async function insertIntoCategories(name, description, imagePath) {
  const SQL = `
  INSERT INTO categories(name,about,imagepath)
  VALUES ('${name}', '${description}','${imagePath}');
  `;

  await pool.query(SQL);
}

async function insertIntoItems(itemData) {
  const SQL = `
  INSERT INTO items(name,price,rating,publisher,release_date,units,logo,image,about,genres)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
  `;

  await pool.query(SQL, Object.values(itemData));
}

export { getAllCategories, getAllItems, insertIntoCategories, insertIntoItems };
