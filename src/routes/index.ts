import { Router } from 'express'

// import routes
import authRouter from './authRouter.js'
import credentialRouter from './credentialRouter.js'
import notesRouter from './notesRouter.js'
import cardRouter from './cardRouter.js'

const router = Router()

router.use(authRouter)
router.use("/credential", credentialRouter)
router.use("/notes", notesRouter)
router.use("/card", cardRouter)

export default router
