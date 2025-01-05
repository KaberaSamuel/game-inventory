import { getAllItems } from "../db/queries.js";

async function itemsHomeGetReqs(req, res) {
  const items = await getAllItems();
  res.render("items", { items: items });
  // console.log(items);
  // res.send("all items");
}

async function newItemGetReqs(req, res) {
  res.render("newItem");
}

export { itemsHomeGetReqs, newItemGetReqs };
