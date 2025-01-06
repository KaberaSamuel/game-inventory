import { fileLoader } from "ejs";
import { getAllCategories } from "../db/queries.js";
import multer from "multer";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllCategories();
  res.render("categories", { categories: categories });
  // console.log(categories);
  // res.send("all categories");
}

async function newCategoryGetReqs(req, res) {
  res.render("newCategory");
}

async function newCategoryPostReqs(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/categories/create");
}

export { categoriesHomeGetReqs, newCategoryGetReqs, newCategoryPostReqs };
