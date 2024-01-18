import express from 'express';
import * as controller from '../controllers/mainController.js';

const router = express.Router();

// Define routes
router.get('/', controller.getIndex);
router.get('/about', controller.getAbout);

router.get('/crud', controller.loadCRUD);
router.post('/create-player', controller.createPlayer);
router.get('/edit-player/:id', controller.editPlayer);
router.post('/update-player/:id', controller.updatePlayer);
router.get('/delete-player/:id', controller.deletePlayer);
router.get('/add-goal/:id', controller.addGoal);

router.get('/:name', controller.getIndex);

export default router;
