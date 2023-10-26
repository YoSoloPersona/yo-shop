
import debug from 'debug';

// locals
import { db } from './db/db';
import { start } from './app';

// protocols
const log = debug('app:log');
const error = debug('app:error');0
 
// init db
db()
// start server
.then(() => start())
// catch errors
.catch((err) => {
    error(err);
});
