import {
  insertIntoItems,
  getAllElements,
  getTableElement,
  updateItemsTable,
  deleteFromTable,
} from "../db/queries.js";

function formatDate(unformattedDate) {
  const date = new Date(unformattedDate);
  return date.toDateString();
}

//function for extracting ready data to insert into items table
function getDataFromItemForm(req) {
  const { name, about, genres, price, units, publisher, release_date, rating } =
    req.body;

  // getting list of genres in a string
  let genreString;
  if (typeof genres === "string") {
    genreString = genres;
  } else {
    genreString = genres.join(",");
  }

  const logo = req.files.logo[0].filename;
  const image = req.files.cover[0].filename;

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

  return itemData;
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
  const itemData = getDataFromItemForm(req);
  await insertIntoItems(itemData);
  res.redirect("/items");
}

async function updateItemGetReqs(req, res) {
  const allCategories = await getAllElements("categories");
  const { itemName } = req.params;
  const [itemData] = await getTableElement("items", itemName);

  const { price, rating, publisher, release_date, units, about, genres } =
    itemData;

  const genresArray = genres.split(",");

  res.render("updateItem", {
    itemName: itemName,
    price: price,
    rating: rating,
    publisher: publisher,
    release_date: release_date,
    units: units,
    about: about,
    genres: genresArray,
    categories: allCategories,
  });
}

async function updateItemPostReqs(req, res) {
  const itemData = getDataFromItemForm(req);
  const { name: itemName } = itemData;

  await updateItemsTable(itemName, itemData);
  res.redirect("/items");
}

async function deleteItemGetReqs(req, res) {
  const { itemName } = req.params;
  const [itemData] = await getTableElement("items", itemName);
  const { image } = itemData;
  res.render("delete", {
    image: image,
    name: itemName,
    table: "items",
    elementTitle: "item",
  });
}

async function deleteItemPostReqs(req, res) {
  const { choice } = req.body;
  const { itemName } = req.params;
  if (choice === "yes") {
    await deleteFromTable("items", itemName);
  }
  res.redirect("/items");
}

export {
  itemsHomeGetReqs,
  singleItemGetReqs,
  newItemGetReqs,
  newItemPostReqs,
  updateItemGetReqs,
  updateItemPostReqs,
  deleteItemGetReqs,
  deleteItemPostReqs,
};
