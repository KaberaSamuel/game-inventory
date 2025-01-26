import { body } from "express-validator";
import { getTableElement } from "../db/queries.js";

async function getFeaturedCategories() {
  const [action] = await getTableElement("categories", "action");
  const [adventure] = await getTableElement("categories", "adventure");
  const [racing] = await getTableElement("categories", "racing");
  const [sports] = await getTableElement("categories", "sports");

  return [action, adventure, racing, sports];
}

async function handleHomeReqs(req, res) {
  const featuredCategories = await getFeaturedCategories();

  res.render("index", {
    featuredCategories: featuredCategories,
  });
}

export { handleHomeReqs };
