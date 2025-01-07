import path from "node:path";
import express from "express";
import homeRouter from "./routes/homeRoute.js";
import categoriesRouter from "./routes/categoriesRoute.js";
import itemsRouter from "./routes/itemsRoute.js";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join("./", "views"));
app.use("/public", express.static("./" + "public"));
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter);
app.use("/items", itemsRouter);
app.use("/categories", categoriesRouter);

app.listen(3000);
