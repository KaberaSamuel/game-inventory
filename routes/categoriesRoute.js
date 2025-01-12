import { Router } from "express";
import {
  categoriesHomeGetReqs,
  singleCategoryGetReqs,
  newCategoryGetReqs,
  newCategoryPostReqs,
} from "../controllers/categoriesController.js";

import uploadHandler from "../controllers/upload.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesHomeGetReqs);
categoriesRouter.get("/create", newCategoryGetReqs);
categoriesRouter.get("/:categoryName", singleCategoryGetReqs);

categoriesRouter.post(
  "/create",
  uploadHandler.single("file"),
  newCategoryPostReqs
);

export default categoriesRouter;
