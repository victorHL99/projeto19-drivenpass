import { Router } from 'express'

// import routes
import authRouter from './authRouter.js'
import credentialRouter from './credentialRouter.js'
import notesRouter from './notesRouter.js'

const router = Router()

router.use(authRouter)
router.use("/credential", credentialRouter)
router.use("/notes", notesRouter)

export default router
