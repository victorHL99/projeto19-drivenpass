import { Router } from 'express'

// import routes
import authRouter from './authRouter.js'

const router = Router()

router.use(authRouter)

export default router
