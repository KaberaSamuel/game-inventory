import { fileLoader } from "ejs";
import { getAllCategories, insertIntoCategories } from "../db/queries.js";
import multer from "multer";
import { fileLoader } from "ejs";
import { getAllCategories } from "../db/queries.js";
import multer from "multer";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllCategories();
  res.render("categories", { categories: categories });
  // console.log(categories);
  // res.send("all categories");
}

function newCategoryGetReqs(req, res) {
  res.render("newCategory");
}

async function newCategoryPostReqs(req, res) {
  const { name, about } = req.body;
  const imagePath = req.file.path;
  console.log(name, about, imagePath);
  // await insertIntoCategories(name, about, imagePath);
  res.redirect("/categories");
}

export { categoriesHomeGetReqs, newCategoryGetReqs, newCategoryPostReqs };
async function newCategoryPostReqs(req, res) {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/categories/create");
}

export { categoriesHomeGetReqs, newCategoryGetReqs, newCategoryPostReqs };
