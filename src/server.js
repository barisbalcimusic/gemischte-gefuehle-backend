import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { appRouter } from "./routers/appRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectDB } from "./utils/connectDB.js";

dotenv.config();

// LOAD ENV VARIABLES
const db_url = process.env.DB_URL;
const port = process.env.PORT || 3000;
const base_url_frontend = process.env.BASE_URL_FRONTEND;

//CONNECT TO DB
await connectDB(db_url);

// CREATE EXPRESS APP
export const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: [
      base_url_frontend,
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

// COOKIE PARSER
app.use(cookieParser());

// ROUTES
app.use("/", appRouter);
app.use(errorMiddleware);

// START SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
