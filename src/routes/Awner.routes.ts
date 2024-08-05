import { Router } from "express";
import { AwnerController } from "../controllers/Awner.controllers";
import { checkAuth } from "../guards/checkAuth.guard";

const router = Router();
const awnerController = new AwnerController();

router.post('/register', awnerController.registerAwnerController)
router.post('/login', awnerController.loginAwnerController)
router.use(checkAuth);
router.get('/all', awnerController.getAllAwners)
router.get('/:id', awnerController.getAwnerById)
router.delete('/distroy', awnerController.deleteAllAwnersController)
router.delete('/:id', awnerController.deleteAwnerByIdController)
router.put('/:id', awnerController.updateAwnerById)

export default router