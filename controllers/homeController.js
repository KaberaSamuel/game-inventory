import { body } from "express-validator";
import { getTableElement } from "../db.js";

async function getFeaturedCategories() {
  const [action] = await getTableElement("categories", "action");
  const [adventure] = await getTableElement("categories", "adventure");
  const [racing] = await getTableElement("categories", "racing");
  const [sports] = await getTableElement("categories", "sports");

  return [action, adventure, racing, sports];
}

async function getFeaturedItems() {
  const [blackMythWukong] = await getTableElement("items", "black myth wukong");
  const [fornite] = await getTableElement("items", "fornite");
  const [needForSpeed] = await getTableElement("items", "need for speed");
  const [callOfDuty] = await getTableElement(
    "items",
    "Call of Duty: Black Ops Ⅲ"
  );

  return [blackMythWukong, fornite, needForSpeed, callOfDuty];
}

async function handleHomeReqs(req, res, next) {
  const featuredCategories = await getFeaturedCategories();
  const featuredItems = await getFeaturedItems();

  res.render("index", {
    featuredCategories: featuredCategories,
    featuredItems: featuredItems,
  });
}

export { handleHomeReqs };
