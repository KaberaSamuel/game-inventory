import {
  insertIntoItems,
  getAllElements,
  getTableElement,
} from "../db/queries.js";

function formatDate(unformattedDate) {
  const date = new Date(unformattedDate);
  return date.toDateString();
}

async function itemsHomeGetReqs(req, res) {
  const items = await getAllElements("items");
  res.render("items", { itemsArray: items });
}

async function singleItemGetReqs(req, res) {
  const { itemName } = req.params;

  const [itemData] = await getTableElement("items", itemName);
  const {
    image: coverImage,
    about: description,
    genres,
    price,
    rating,
    publisher,
    units,
  } = itemData;

  const release_date = formatDate(itemData.release_date);

  const genresArray = genres.split(",");

  res.render("item", {
    coverImage: coverImage,
    itemName: itemName,
    description: description,
    price: price,
    rating: rating,
    publisher: publisher,
    release_date: release_date,
    units: units,
    genresArray: genresArray,
  });
}

async function newItemGetReqs(req, res) {
  const categories = await getAllElements("categories");
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

  await insertIntoItems(itemData);
  res.redirect("/items");
}

export { itemsHomeGetReqs, singleItemGetReqs, newItemGetReqs, newItemPostReqs };
