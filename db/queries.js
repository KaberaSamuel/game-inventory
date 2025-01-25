import pool from "./pool.js";

const categoriesTableSQL = `
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR,
    about VARCHAR,
    image VARCHAR

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

async function insertIntoCategories(name, description, image) {
  const SQL = `
  INSERT INTO categories(name,about,image)
  VALUES ($1, $2, $3);
  `;

  await pool.query(SQL, [name, description, image]);
}

async function insertIntoItems(itemData) {
  const SQL = `
  INSERT INTO items(name,price,rating,publisher,release_date,units,logo,image,about,genres)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
  `;

  await pool.query(SQL, Object.values(itemData));
}

async function getAllElements(tableName) {
  try {
    const { rows: elementsArray } = await pool.query(
      `SELECT * FROM ${tableName};`
    );

    return elementsArray;
  } catch (error) {
    console.log(error);
  }
}

async function getTableElement(table, columnName) {
  const { rows } = await pool.query(
    `SELECT * FROM ${table} WHERE name='${columnName}';`
  );

  return rows;
}

async function getItemsFromGenre(genreName) {
  const { rows } = await pool.query(
    `SELECT * FROM items WHERE genres LIKE '%${genreName}%';`
  );

  return rows;
}

async function updateItemsTable(itemName, itemData) {
  const {
    name,
    price,
    rating,
    publisher,
    release_date,
    units,
    logo,
    image,
    about,
    genreString,
  } = itemData;

  const SQL = `
    UPDATE items
    SET name=$1, price=$2, rating=$3, publisher=$4, release_date=$5, units=$6, logo=$7, image=$8, about=$9, genres=$10
    WHERE name='${itemName}';
  `;

  await pool.query(SQL, [
    name,
    price,
    rating,
    publisher,
    release_date,
    units,
    logo,
    image,
    about,
    genreString,
  ]);
}

async function updateCategoriesTable(categoryName, categoryData) {
  const { categoryName: name, about, image } = categoryData;

  const SQL = `
    UPDATE categories
    SET name=$1, about=$2, image=$3
    WHERE name='${categoryName}';
  `;

  await pool.query(SQL, [name, about, image]);
}

async function deleteFromTable(tableName, elementName) {
  const SQL = `
    DELETE FROM ${tableName} WHERE name='${elementName}';
  `;

  await pool.query(SQL);
}

export {
  insertIntoCategories,
  insertIntoItems,
  getAllElements,
  getTableElement,
  getItemsFromGenre,
  updateItemsTable,
  updateCategoriesTable,
  deleteFromTable,
};
