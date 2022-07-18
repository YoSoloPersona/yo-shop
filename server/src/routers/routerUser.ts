import { Router } from "express";

import ControllerUser from "../controllers/controllerUser";

const router = Router();

router.get('/auth', ControllerUser.auth);
router.post('/registration', ControllerUser.registration);
router.post('/login', ControllerUser.login);
router.delete('/', ControllerUser.delete);

export default router;