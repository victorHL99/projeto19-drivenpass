import express from 'express';
import cors from 'cors';
import 'express-async-errors';

// import middlewares

// import routes

const app = express();

app.use(cors());
app.use(express.json());

export default app;
