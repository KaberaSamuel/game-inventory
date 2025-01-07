import { getAllItems, getAllCategories } from "../db/queries.js";

async function itemsHomeGetReqs(req, res) {
  const items = await getAllItems();

  res.render("items", { items: items });
}

async function newItemGetReqs(req, res) {
  const categories = await getAllCategories();
  res.render("newItem", { categories: categories });
}

export { itemsHomeGetReqs, newItemGetReqs };
