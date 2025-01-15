import { Router } from "express";
import {
  itemsHomeGetReqs,
  singleItemGetReqs,
  newItemGetReqs,
  newItemPostReqs,
  updateItemGetReqs,
  updateItemPostReqs,
} from "../controllers/itemsController.js";

import uploadHandler from "../controllers/upload.js";

const itemsRouter = Router();

itemsRouter.get("/", itemsHomeGetReqs);
itemsRouter.get("/create", newItemGetReqs);
itemsRouter.get("/:itemName", singleItemGetReqs);
itemsRouter.get("/:itemName/update", updateItemGetReqs);

itemsRouter.post(
  "/create",
  uploadHandler.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  newItemPostReqs
);

itemsRouter.post(
  "/:itemName/update",
  uploadHandler.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),

  updateItemPostReqs
);

export default itemsRouter;
