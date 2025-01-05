import { getAllItems } from "../db/queries.js";

async function itemsHomeGetReqs(req, res) {
  const items = await getAllItems();
  res.render("items", { items: items });
}

export { itemsHomeGetReqs };
