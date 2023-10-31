import { ControllerUser } from './components/user/';
import { db } from './db';

db()    
// Добавляем главного админнистратора
.then(() =>
    new ControllerUser().registration({
        email: 'yo.solo.persona@gmail.com',
        password: '1234',
        role: 'root'
    })
)
.catch(console.error);
