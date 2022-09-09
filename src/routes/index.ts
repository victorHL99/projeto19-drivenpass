import { Router } from 'express'

// import routes
import authRouter from './authRouter.js'
import credentialRouter from './credentialRouter.js'

const router = Router()

router.use(authRouter)
router.use("/credential", credentialRouter)

export default router
