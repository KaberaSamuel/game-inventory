import { Router } from "express";
import {
  categoriesHomeGetReqs,
  singleCategoryGetReqs,
  newCategoryGetReqs,
  newCategoryPostReqs,
  updateCategoryGetReqs,
  updateCategoryPostReqs,
} from "../controllers/categoriesController.js";

import uploadHandler from "../controllers/upload.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesHomeGetReqs);
categoriesRouter.get("/create", newCategoryGetReqs);

categoriesRouter.get("/:categoryName/update", updateCategoryGetReqs);
categoriesRouter.get("/:categoryName", singleCategoryGetReqs);

categoriesRouter.post(
  "/:categoryName",
  uploadHandler.single("file"),
  updateCategoryPostReqs
);
categoriesRouter.post(
  "/create",
  uploadHandler.single("file"),
  newCategoryPostReqs
);

export default categoriesRouter;
