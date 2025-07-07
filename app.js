import path from "node:path";
import express from "express";
import homeRouter from "./routes/homeRoute.js";
import categoriesRouter from "./routes/categoriesRoute.js";
import itemsRouter from "./routes/itemsRoute.js";
import { handleNotFoundPages } from "./controllers/notFound.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join("./", "views"));
app.use("/public", express.static("./" + "public"));
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);
app.use("/", homeRouter);

app.all("*", handleNotFoundPages);

app.listen(3000, () => {
  console.log("server open");
});
