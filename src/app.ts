import express from 'express'
import cors from 'cors'
import 'express-async-errors'

// import middlewares
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'

// import routes

const app = express()

app.use(cors())
app.use(express.json())
app.use(errorHandlerMiddleware)

export default app
