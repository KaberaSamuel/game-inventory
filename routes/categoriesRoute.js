import { Router } from "express";
import categoriesHomeGetReqs from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesHomeGetReqs);

export default categoriesRouter;
