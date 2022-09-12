import { Router } from "express";

import notesController from "../controllers/notesController.js";

import schemaValidate from "../middlewares/schemaValidate.js";
import tokenValidate from "../middlewares/tokenValidate.js";

import noteSchema from "../schemas/notesSchema.js";

const notesRouter = Router();

notesRouter.post("/create", schemaValidate(noteSchema.noteCreateSchema), tokenValidate, notesController.createNote);

export default notesRouter;