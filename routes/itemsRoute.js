import { Router } from "express";
import {
  itemsHomeGetReqs,
  singleItemGetReqs,
  newItemGetReqs,
  newItemPostReqs,
  updateItemGetReqs,
  updateItemPostReqs,
  deleteItemGetReqs,
  deleteItemPostReqs,
} from "../controllers/itemsController.js";

import uploadHandler from "../controllers/upload.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsHomeGetReqs);
itemsRouter.get("/create", newItemGetReqs);
itemsRouter.get("/:itemName/update", updateItemGetReqs);
itemsRouter.get("/:itemName/delete", deleteItemGetReqs);
itemsRouter.get("/:itemName", singleItemGetReqs);

itemsRouter.post(
  "/:itemName/update",
  uploadHandler.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateItemPostReqs
);
itemsRouter.post("/:itemName/delete", deleteItemPostReqs);
itemsRouter.post(
  "/create",
  uploadHandler.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  newItemPostReqs
);

export default itemsRouter;
