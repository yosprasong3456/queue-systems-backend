"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const queueController_1 = __importDefault(require("../controllers/queueController"));
const router = express_1.default.Router();
router.get('/', queueController_1.default.readAll);
router.get('/:queueID', queueController_1.default.readQueue);
router.post('/', queueController_1.default.insertQueue);
module.exports = router;
