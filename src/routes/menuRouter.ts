import express from 'express';
import controller from '../controllers/menuController';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:menuID', controller.readMenu);
router.put('/:menuID', ValidateJoi(Schemas.menu.update), controller.updateMenu);

export = router;