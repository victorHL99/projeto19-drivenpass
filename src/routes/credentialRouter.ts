import { Router } from "express";

import credentialController from "../controllers/credentialController.js";

import schemaValidate from "../middlewares/schemaValidate.js";
import tokenValidate from "../middlewares/tokenValidate.js";

import credentialSchema from "../schemas/credentialSchema.js";

const credentialRouter = Router();

credentialRouter.post("/credential/create", schemaValidate(credentialSchema.credentialCreateSchema), credentialController.createCredential);

export default credentialRouter;

// TODO
// - [] Implementar validate token
// - [] Implementar CredentialController
// - [] Implementar CredentialService
// - [] Implementar CredentialRepository
// - [] Implementar CredentialModel
// - [] Implementar CredentialSchema
// - [V] Implementar CredentialRoutes