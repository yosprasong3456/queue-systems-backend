"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Menu_1 = __importDefault(require("../controllers/Menu"));
// import { Schemas, ValidateJoi } from '../middleware/Joi';
const router = express_1.default.Router();
router.get('/get/', Menu_1.default.readAll);
module.exports = router;
