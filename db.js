import { unlink } from "fs/promises";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config"; // Load environment variables

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function insertIntoCategories(name, description, image) {
  const { data, error } = await supabase
    .from("categories")
    .insert({ name: name, about: description, image: image, editable: true });

  if (error) {
    throw error;
  }
  return data;
}

async function insertIntoItems(itemData) {
  const {
    name,
    price,
    rating,
    publisher,
    release_date,
    units,
    logo,
    image,
    about,
    genresString,
  } = itemData;

  const { data, error } = await supabase.from("items").insert({
    name,
    price,
    rating,
    publisher,
    release_date,
    units,
    logo,
    image,
    about,
    genres: genresString,
    editable: true,
  });

  if (error) {
    throw error;
  }
  return data;
}

async function getAllElements(tableName) {
  try {
    const { data: elementsArray, error } = await supabase
      .from(tableName)
      .select("*");

    if (error) {
      throw error;
    }
    return elementsArray;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getTableElement(table, columnName) {
  const { data: rows, error } = await supabase
    .from(table)
    .select("*")
    .eq("name", columnName)
    .limit(1);

  if (error) {
    throw error;
  }
  return rows;
}

async function getItemsFromGenre(genreName) {
  const { data: rows, error } = await supabase
    .from("items")
    .select("*")
    .ilike("genres", `%${genreName}%`);

  if (error) {
    throw error;
  }
  return rows;
}

async function getEditableRows(table) {
  const { data: rows, error } = await supabase
    .from(table)
    .select("*")
    .eq("editable", true);

  if (error) {
    throw error;
  }
  return rows;
}

async function updateItemsTable(itemName, itemData) {
  const {
    name,
    price,
    rating,
    publisher,
    release_date,
    units,
    logo,
    image,
    about,
    genresString,
  } = itemData;
  const { data, error } = await supabase
    .from("items")
    .update({
      name,
      price,
      rating,
      publisher,
      release_date,
      units,
      logo,
      image,
      about,
      genres: genresString,
    })
    .eq("name", itemName);

  if (error) {
    throw error;
  }
  return data;
}

async function updateCategoriesTable(categoryName, categoryData) {
  const { name, about, image } = categoryData;
  const { data, error } = await supabase
    .from("categories")
    .update({ name, about, image })
    .eq("name", categoryName);

  if (error) {
    throw error;
  }
  return data;
}

async function deleteFile(filename) {
  const filePath = `public/images/${filename}`;
  try {
    await unlink(filePath);
  } catch (err) {
    console.error("Error deleting file:", err);
  }
}

async function deleteFromTable(tableName, elementName, associatedFiles) {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq("name", elementName);

    // deleting associated files, i.e., cover and logo images
    for (const file of associatedFiles) {
      await deleteFile(file);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export {
  insertIntoCategories,
  insertIntoItems,
  getAllElements,
  getTableElement,
  getItemsFromGenre,
  getEditableRows,
  updateItemsTable,
  updateCategoriesTable,
  deleteFromTable,
};
