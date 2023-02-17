"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const menuController_1 = __importDefault(require("../controllers/menuController"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
router.get('/', menuController_1.default.readAll);
router.get('/:menuID', menuController_1.default.readMenu);
router.put('/:menuID', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.menu.update), menuController_1.default.updateMenu);
module.exports = router;
