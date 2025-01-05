import { getAllCategories } from "../db/queries.js";

async function categoriesHomeGetReqs(req, res) {
  const categories = await getAllCategories();
  res.render("categories", { categories: categories });
}

export default categoriesHomeGetReqs;
