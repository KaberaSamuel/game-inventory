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
    price DECIMAL,
    rating DECIMAL,
    publisher VARCHAR,
    release_date DATE,
    units INT,
    logo VARCHAR,
    image VARCHAR,
    about TEXT,
    genres VARCHAR

);

INSERT INTO items (name, price, rating, publisher, release_date, units, logo, image, about, genres)
VALUES
    ('grand theft auto Ⅲ', 1200, 4.8, 'rockstar games', '2018-11-06', 20, 'Grand theft logo', 
    'grand theft image', 'Welcome to Liberty City. Where it all began. The critically acclaimed blockbuster Grand Theft Auto III brings to life the dark and seedy underworld of Liberty City. With a massive and diverse open world, a wild cast of characters from every walk of life, and the freedom to explore at will, Grand Theft Auto III puts the dark, intriguing, and ruthless world of crime at your fingertips.', 'action, adventure, racing' ),

    ('max payne', 850, 4.3, 'rockstar games', '2011-04-23',45, 'max payne logo', 'max payne image', 'Max Payne is a man with nothing to lose in the violent, cold, urban night. A fugitive undercover cop framed for murder, and now hunted by cops and the mob. Max is a man with his back against the wall, fighting a battle he cannot hope to win. Prepare for a new breed of deep action game. Prepare for pain... It is a relentless story-driven game about a man on the edge, fighting for his justice while uncovering plot twists and twisted thugs in the gritty bowels of New York.', 'action');

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

export { getAllCategories, getAllItems, insertIntoCategories };
