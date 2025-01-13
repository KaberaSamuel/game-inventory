import pool from "../db/pool.js";
import {
  getAllElements,
  getTableElement,
  getItemsFromGenre,
  insertIntoCategories,
} from "../db/queries.js";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllElements("categories");
  res.render("categories", { categories: categories });
}

async function singleCategoryGetReqs(req, res) {
  const { categoryName } = req.params;

  const [categoryData] = await getTableElement("categories", categoryName);

  const { about, imagepath: image } = categoryData;

  const genreItemsData = await getItemsFromGenre(categoryName);

  res.render("category", {
    name: categoryName,
    description: about,
    image: image,
    categoryItems: genreItemsData,
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
