import { Router } from "express";

import credentialController from "../controllers/credentialController.js";

import schemaValidate from "../middlewares/schemaValidate.js";
import tokenValidate from "../middlewares/tokenValidate.js";

import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post("/create", schemaValidate(credentialSchema.credentialCreateSchema), tokenValidate, credentialController.createCredential);
credentialRouter.get("/all", tokenValidate, credentialController.getAllCredentials);

export default credentialRouter;

// TODO Implementar CredentialController
// TODO Implementar CredentialService
// TODO Implementar CredentialRepository
// TODO Implementar CredentialModel
// TODO Implementar CredentialSchema
// - [V] Implementar CredentialRoutes