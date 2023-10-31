
import debug from 'debug';

// locals
import { db } from './db';
import { addController, start } from './app';
import { ControllerUser } from './components/user';

// protocols
const log = debug('app:log');
const error = debug('app:error');0
 
// init db
db()
// add controllers
.then(() => addController(ControllerUser))
// start server
.then(() => start())
// catch errors
.catch((err) => {
    error(err);
});
