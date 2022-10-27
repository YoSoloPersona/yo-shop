import ControllerUser from './controllers/user';
import { sequelize } from './db/sequelize';

sequelize
    // Соединяемся с БД
    .authenticate()
    // Синхронизируемся
    .then(() => sequelize.sync())
     // Добавляем главного админнистратора
    .then(() => ControllerUser.registration('yo.solo.persona@gmail.com', '1234', 'root'))

    .catch(console.error);
