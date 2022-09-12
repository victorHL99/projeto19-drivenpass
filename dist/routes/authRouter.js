import { Router } from "express";
import schemaValidate from "../middlewares/schemaValidate.js";
import authController from "../controllers/authController.js";
import authSchemas from "../schemas/authSchema.js";
var authRouter = Router();
authRouter.post("/signup", schemaValidate(authSchemas.signupSchema), authController.createUser);
authRouter.post("/signin", schemaValidate(authSchemas.signinSchema), authController.login);
export default authRouter;
