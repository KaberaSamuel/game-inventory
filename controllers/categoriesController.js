import { getAllCategories } from "../db/queries.js";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllCategories();
  res.render("categories", { categories: categories });
  // console.log(categories);
  // res.send("all categories");
}

async function newCategoryGetReqs(req, res) {
  res.render("newCategory");
}

export { categoriesHomeGetReqs, newCategoryGetReqs };
