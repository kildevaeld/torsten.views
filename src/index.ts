
export * from './collection';
export * from './list/index';
export * from './gallery/index';
export * from './crop/index';

import {TorstenClient, TorstenClientOptions} from 'torsten';

export function createClient(options: TorstenClientOptions) {
    return new TorstenClient(options);
}