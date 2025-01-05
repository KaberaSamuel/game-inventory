import { Router } from "express";
import {
  itemsHomeGetReqs,
  newItemGetReqs,
} from "../controllers/itemsController.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsHomeGetReqs);
itemsRouter.get("/create", newItemGetReqs);

export default itemsRouter;
