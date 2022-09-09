import { Router } from "express";

import validateSchema from "../middlewares/schemaValidate";
import validateToken from "../middlewares/tokenValidate";

import credentialSchema from "../schemas/credentialSchema";

const credentialRouter = Router();

credentialRouter.post("/credential/create", validateSchema(credentialSchema.credentialCreateSchema))

export default credentialRouter;

// TODO
// - [] Implementar validate token
// - [] Implementar CredentialController
// - [] Implementar CredentialService
// - [] Implementar CredentialRepository
// - [] Implementar CredentialModel
// - [] Implementar CredentialSchema
// - [V] Implementar CredentialRoutes