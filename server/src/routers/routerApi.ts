import { Router, Request, Response, NextFunction } from 'express';
import debug from 'debug';

// local
import ErrorApi from '../errors/errorApi';
import { role } from '../middleware/role';
import { router as routerUser } from './routerUser';
import ControllerBrand from '../controllers/controllerBrand';
import ControllerDevice from '../controllers/controllerDevice';
import ControllerType from '../controllers/controllerType';
import { domain } from './domain';

// протоколы
const log = debug('app:log');
const logError = debug('app:error');

/** Корневой роутер API. */
export const router = Router();

// список для создания роутеров на основе путей контроллеров
const list = [
    // Бренды
    {
        path: domain.api.brand.url,
        controller: ControllerBrand
    },
    // Товары
    {
        path: domain.api.device.url,
        controller: ControllerDevice
    },
    // 
    {
        path: domain.api.type.url,
        controller: ControllerType
    }
] // Создаём роутеры
    .map(element => {
        const childRouter = Router();

        // GET запрос элементов
        childRouter.get(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                element.controller
                    .findAll({ where: { ...req.query } })
                    // Получили список элементов из БД
                    .then(listElements => res.json(listElements))
                    // Возникла ошибка при получении элементов из БД
                    .catch(err => {
                        next(ErrorApi.internal(err.message));
                    });
            }
        );

        // POST запрос на добавление нового элемента
        childRouter.post(
            '/',
            role('ADMIN'),
            (req: Request, res: Response, next: NextFunction) => {
                log(`Добавление ${req.body}`);

                element.controller
                    .add(req.body)
                    // Элемент был добавлен в БД
                    .then(el => res.json(el))
                    // Возникла ошибка при добавлении в БД
                    .catch(err => {
                        logError(`Ошибка при добавлении: ${err.message}`);
                        next(
                            ErrorApi.badRequest(
                                `Возникла ошибка при добавлении элемента: "${err.message}"`
                            )
                        );
                    });
            }
        );

        // Удаление элемента из БД
        childRouter.delete(
            '/',
            (req: Request, res: Response, next: NextFunction) => {
                log({ where: { ...req.query } });
                element.controller
                    .remove({ where: { ...req.query } })
                    // Данные успешно удалены
                    .then(countDeleted => {
                        res.status(200).send(countDeleted);
                    })
                    // Возникла ошибка при удалении данных
                    .catch(err => {
                        next(ErrorApi.badRequest(`Возникла ошибка при удалении элементов: "${err.message}"`));
                    });
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
list.forEach(kvp => {
    router.use(kvp.path, kvp.router);
});
