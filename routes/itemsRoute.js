import { Router } from "express";
import { itemsHomeGetReqs } from "../controllers/itemsController.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsHomeGetReqs);

export default itemsRouter;
