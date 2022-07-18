import { Router, Request, Response, NextFunction } from 'express';

// local
import ErrorApi from '../errors/errorApi';
import routerUser from './routerUser';
import ControllerBrand from '../controllers/controllerBrand';
import ControllerDevice from '../controllers/controllerDevice';
import ControllerType from '../controllers/controllerType';

const router = Router();

// список для создания роутеров на основе путей контроллеров
const list = [
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

        // GET запрос всех элементов
        childRouter.get(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                element.controller
                    .findAll()
                    // Получили список элементов из БД
                    .then((listElements) => res.json(listElements))
                    // Возникла ошибка при получении элментов из БД
                    .catch((err) => {
                        next(ErrorApi.internal(err.message));
                    });
            }
        );

        // POST запрос нового элемента
        childRouter.post(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                element.controller
                    .add(req.body)
                    // Элемент был добавлен в БД
                    .then((el) => res.json(el))
                    // Возникла ошибка при добавлении в БД
                    .catch((err) => {
                        ErrorApi.badRequest(err.message);
                    });
            }
        );

        // Удаление элемента из БД
        childRouter.delete(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                element.controller
                    .remove()
                    // Данные успешно удалены
                    .then((countDeleted) => {})
                    // Возникла ошибка при удалении данных
                    .catch((err) => {next(ErrorApi.internal(err.message))});
            }
        );

        return {
            path: element.path,
            router: childRouter
        };
    });

// Добавляем в ручную созданные роутеры
list.splice(-1, 0, {
    path: '/user',
    router: routerUser
});

// "Добавляем" дочерние роутеры к родительскому
list.forEach((kvp) => {
    router.use(kvp.path, kvp.router);
});

export default router;
