import { Router } from "express";
import {
  categoriesHomeGetReqs,
  singleCategoryGetReqs,
  newCategoryGetReqs,
  newCategoryPostReqs,
  updateCategoryGetReqs,
  updateCategoryPostReqs,
  deleteCategoryGetReqs,
  deleteCategoryPostReqs,
} from "../controllers/categoriesController.js";

import uploadHandler from "../controllers/upload.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesHomeGetReqs);
categoriesRouter.get("/create", newCategoryGetReqs);
categoriesRouter.get("/:categoryName/update", updateCategoryGetReqs);
categoriesRouter.get("/:categoryName/delete", deleteCategoryGetReqs);
categoriesRouter.get("/:categoryName", singleCategoryGetReqs);

categoriesRouter.post(
  "/create",
  uploadHandler.single("file"),
  newCategoryPostReqs
);
categoriesRouter.post(
  "/:categoryName/update",
  uploadHandler.single("file"),
  updateCategoryPostReqs
);
categoriesRouter.post("/:categoryName/delete", deleteCategoryPostReqs);

export default categoriesRouter;
