import { getAllElements, insertIntoCategories } from "../db/queries.js";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllElements("categories");
  res.render("categories", { categories: categories });
}

function singleCategoryGetReqs(req, res) {
  const { categoryName } = req.params;
  res.render("category", { name: categoryName });
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
