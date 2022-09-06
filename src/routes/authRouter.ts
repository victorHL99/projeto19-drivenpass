import { Router } from "express"; 
import schemaValidate from "../middlewares/schemaValidate.js";

import authController from "../controllers/authController.js";
import authSchemas from "../schemas/authSchema.js";


const authRouter = Router();

authRouter.post("/signup", schemaValidate(authSchemas.signupSchema),  authController.createUser);

export default authRouter