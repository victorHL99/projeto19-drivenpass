import { Router } from "express";

import cardController from "../controllers/cardController.js";

import schemaValidate from "../middlewares/schemaValidate.js";
import tokenValidate from "../middlewares/tokenValidate.js";

import cardSchema from "../schemas/cardSchema.js";

const cardRouter = Router();

cardRouter.post("/create", schemaValidate(cardSchema.cardCreateSchema), tokenValidate, cardController.createCard)
cardRouter.get("/all", tokenValidate, cardController.getAllCards)

export default cardRouter;