import { Router } from "express";
import {
  categoriesHomeGetReqs,
  newCategoryGetReqs,
} from "../controllers/categoriesController.js";
const categoriesRouter = Router();

categoriesRouter.get("/", categoriesHomeGetReqs);
categoriesRouter.get("/create", newCategoryGetReqs);

export default categoriesRouter;
