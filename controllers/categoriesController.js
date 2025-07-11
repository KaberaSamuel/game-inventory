import {
  getAllElements,
  getTableElement,
  getEditableRows,
  getItemsFromGenre,
  insertIntoCategories,
  deleteFromTable,
  updateCategoriesTable,
} from "../db.js";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllElements("categories");
  res.render("categories", { categories: categories });
}

async function singleCategoryGetReqs(req, res) {
  const { categoryName } = req.params;

  const [categoryData] = await getTableElement("categories", categoryName);
  const { about, image } = categoryData;

  const editableCategories = await getEditableRows("categories");
  const isEditable = editableCategories.find(
    ({ name }) => name === categoryName
  )
    ? true
    : false;

  const genreItemsData = await getItemsFromGenre(categoryName);

  res.render("category", {
    name: categoryName,
    description: about,
    image: image,
    categoryItems: genreItemsData,
    isEditable,
  });
}

function newCategoryGetReqs(req, res) {
  res.render("newCategory");
}

async function newCategoryPostReqs(req, res) {
  const { name, about } = req.body;
  const image = req.file.filename;
  await insertIntoCategories(name, about, image);
  res.redirect("/categories");
}

async function updateCategoryGetReqs(req, res) {
  const { categoryName } = req.params;
  const [categoryData] = await getTableElement("categories", categoryName);

  const { name, about } = categoryData;
  res.render("updateCategory", {
    name: name,
    description: about,
  });
}

async function updateCategoryPostReqs(req, res) {
  const { name: categoryName, about } = req.body;
  const image = req.file.filename;
  const categoryData = { categoryName, about, image };
  await updateCategoriesTable(categoryName, categoryData);
  res.redirect("/categories");
}

async function deleteCategoryGetReqs(req, res) {
  const { categoryName } = req.params;
  const [categoryData] = await getTableElement("categories", categoryName);
  const { image } = categoryData;
  res.render("delete", {
    image: image,
    name: categoryName,
    table: "categories",
    elementTitle: "category",
  });
}

async function deleteCategoryPostReqs(req, res) {
  const { choice } = req.body;

  if (choice === "yes") {
    const { categoryName } = req.params;
    // associated file to delete
    const [{ image }] = await getTableElement("categories", categoryName);
    await deleteFromTable("categories", categoryName, [image]);
  }

  res.redirect("/categories");
}

export {
  categoriesHomeGetReqs,
  singleCategoryGetReqs,
  newCategoryGetReqs,
  newCategoryPostReqs,
  updateCategoryGetReqs,
  updateCategoryPostReqs,
  deleteCategoryGetReqs,
  deleteCategoryPostReqs,
};
