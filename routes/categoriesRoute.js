import { Router } from "express";
import multer from "multer";
import {
  categoriesHomeGetReqs,
  newCategoryGetReqs,
  newCategoryPostReqs,
} from "../controllers/categoriesController.js";
import upload from "../controllers/upload.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesHomeGetReqs);
categoriesRouter.get("/create", newCategoryGetReqs);

categoriesRouter.post("/create", upload.single("file"), newCategoryPostReqs);

export default categoriesRouter;
