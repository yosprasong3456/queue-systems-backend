"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const Logging_1 = __importDefault(require("./library/Logging"));
// import controller from './controllers/Menu';
const menuRouter_1 = __importDefault(require("./routes/menuRouter"));
const queueRouter_1 = __importDefault(require("./routes/queueRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongo = process.env.MONGO_URL;
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(mongo, { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("Mongo connected successfully.");
    StartServer();
})
    .catch((error) => Logging_1.default.error(error));
const StartServer = () => {
    /** Log the request */
    app.use(express_1.default.json());
    app.use("/menu", menuRouter_1.default);
    app.use("/queue", queueRouter_1.default);
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
};
