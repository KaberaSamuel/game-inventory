import { Router } from "express";
import { handleHomeReqs } from "../controllers/homeController.js";

const homeRouter = Router();

homeRouter.get("/", handleHomeReqs);

export default homeRouter;
