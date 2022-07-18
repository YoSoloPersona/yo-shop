import { Router, Request, Response, NextFunction } from 'express';

// local
import ErrorApi from "../errors/errorApi";
import routerUser from './routerUser';
import ControllerBrand from '../controllers/controllerBrand';
import ControllerDevice from '../controllers/controllerDevice';
import ControllerType from '../controllers/controllerType';

const router = Router();

// список для создания роутеров
[
    {
        path: '/brand',
        controller: ControllerBrand
    },
    {
        path: '/device',
        controller: ControllerDevice
    },
    {
        path: '/type',
        controller: ControllerType
    }
] // Создаём роутеры
    .map((element) => {
        const childRouter = Router();

        childRouter.get(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                element.controller.findAll();
            }
        );

        childRouter.post(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                element.controller.add(req.body)
                .then(el => res.json(el))
                .catch(err => {
                    ErrorApi.badRequest(err.message);
                });
            }
        );

        childRouter.delete(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                element.controller.remove();
            }
        );

        router.use(element.path, childRouter);

        return {
            path: element.path,
            router
        };
    })
    // Добавляем в ручную созданные роутеры
    .splice(0, 0, {
        path: '/user',
        router: routerUser
    })
    // Добавляем дочерние роутеры к родительскому
    .forEach((kvp) => router.use(kvp.path, kvp.router));

export default router;
