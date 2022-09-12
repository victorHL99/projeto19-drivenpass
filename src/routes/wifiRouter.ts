import { Router } from "express";

import wifiController from "../controllers/wifiController.js";

import validateSchema from "../middlewares/schemaValidate.js";
import tokenValidate from "../middlewares/tokenValidate.js";

import wifiSchema from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/create", validateSchema(wifiSchema.wifiCreateSchema), tokenValidate, wifiController.createWifi);
wifiRouter.get("/all", tokenValidate, wifiController.getAllWifi);

export default wifiRouter;