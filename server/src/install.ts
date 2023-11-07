import debug from 'debug';

// locals
import { ControllerUser } from './components/user/';
import { db } from './db';

const log = debug('install');
const error = debug('install');

log('install');

log('connect to database');
// connect to db
db()
    .then(() => log('successfully'))
    // add root
    .then(() => {
        log('add root');

        return new ControllerUser().registration({
            email: 'yo.solo.persona@gmail.com',
            password: '1234',
            role: 'root'
        });
    })
    .then(() => log('successfully'))
    .catch(error);
