import debug from 'debug';

// locals
import { controller, get } from '../../helpers/decorators';

// protocols
const log = debug('app:controllers:user');
const error = debug('app:controllers:user');

/**
 * Class health controller
 */
@controller({ path: '/health' })
export class ControllerHealt {

    @get()
    registration(): string {
        return 'server is alive';
    }
}
