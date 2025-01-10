import { Router } from "express";
import {
  itemsHomeGetReqs,
  singleItemGetReqs,
  newItemGetReqs,
  newItemPostReqs,
} from "../controllers/itemsController.js";

import uploadHandler from "../controllers/upload.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsHomeGetReqs);
itemsRouter.get("/:itemName", singleItemGetReqs);

itemsRouter.get("/create", newItemGetReqs);
itemsRouter.post(
  "/create",
  uploadHandler.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  newItemPostReqs
);

export default itemsRouter;
