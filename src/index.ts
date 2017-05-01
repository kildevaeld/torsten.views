
export * from './collection';
export * from './list/index';
export * from './gallery/index';
export * from './crop/index';
export * from './modal/index';

export * from './form/index';

import {TorstenClient, TorstenClientOptions} from 'torsten';

export function createClient(options: TorstenClientOptions) {
   
    return new TorstenClient(options);
}

export const version = "@version@";