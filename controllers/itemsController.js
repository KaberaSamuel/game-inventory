import {
  getAllItems,
  getAllCategories,
  insertIntoCategories,
  insertIntoItems,
} from "../db/queries.js";

async function itemsHomeGetReqs(req, res) {
  const items = await getAllItems();
  res.render("items", { items: items });
}

async function newItemGetReqs(req, res) {
  const categories = await getAllCategories();
  res.render("newItem", { categories: categories });
}

async function newItemPostReqs(req, res) {
  const { name, about, genres, price, units, publisher, release_date, rating } =
    req.body;

  // getting list of genres in a string
  let genreString;
  if (typeof genres === "string") {
    genreString = genres;
  } else {
    genreString = genres.join(",");
  }

  const logo = req.files.logo[0].path;
  const image = req.files.cover[0].path;
  const itemData = {
    name,
    price,
    rating,
    publisher,
    release_date,
    units,
    logo,
    image,
    about,
    genreString,
  };

  // console.log(itemData);

  await insertIntoItems(itemData);

  res.redirect("/items");
}

export { itemsHomeGetReqs, newItemGetReqs, newItemPostReqs };
