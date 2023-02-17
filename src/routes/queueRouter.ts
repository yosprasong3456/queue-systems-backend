import express from 'express';
import controller from '../controllers/queueController';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.get('/', controller.readAll);
router.get('/:queueID', controller.readQueue);
router.post('/', controller.insertQueue);
// router.put('/:menuID', ValidateJoi(Schemas.menu.update), controller.updateMenu);

export = router;