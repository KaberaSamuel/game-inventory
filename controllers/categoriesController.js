import pool from "../db/pool.js";
import { getAllElements, insertIntoCategories } from "../db/queries.js";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllElements("categories");
  res.render("categories", { categories: categories });
}

async function singleCategoryGetReqs(req, res) {
  const { categoryName } = req.params;

  const { rows } = await pool.query(
    `SELECT about,imagepath FROM categories WHERE name='${categoryName}';`
  );
  const categoryData = rows[0];

  const { about, imagepath: image } = categoryData;

  const { rows: genreItemsData } = await pool.query(
    `SELECT * FROM items WHERE genres LIKE '%${categoryName}%';`
  );

  res.render("category", {
    name: categoryName,
    description: about,
    image: image,
    items: genreItemsData,
  });
}

function newCategoryGetReqs(req, res) {
  res.render("newCategory");
}

async function newCategoryPostReqs(req, res) {
  const { name, about } = req.body;
  const imagePath = req.file.path;
  await insertIntoCategories(name, about, imagePath);
  res.redirect("/categories");
}

export {
  categoriesHomeGetReqs,
  singleCategoryGetReqs,
  newCategoryGetReqs,
  newCategoryPostReqs,
};
