import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config, MONGO_URL } from "./config/config";
import Logging from "./library/Logging";
// import controller from './controllers/Menu';
import menuRouter from "./routes/menuRouter";
import queueRouter from "./routes/queueRouter"
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongo : any = process.env.MONGO_URL
mongoose.set("strictQuery", false);
mongoose
  .connect(
    mongo,
    { retryWrites: true, w: "majority" }
  )
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));

const StartServer = () => {
  /** Log the request */
  app.use(express.json());
  app.use("/menu", menuRouter);
  app.use("/queue", queueRouter);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};
