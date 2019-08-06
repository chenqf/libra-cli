import { RC, DEFAULTS } from './constants';

import { decode, encode } from 'ini';

import { promisify } from 'util';

import fs from 'fs';

const exits = promisify(fs.exists);
const readFile = promisify(fs.readFile);


export const getAll = async () => {
    const exit = await exits(RC);
    let opts;
    if (exit) {
        opts = await readFile(RC, 'utf8');
        opts = decode(opts);
        return opts;
    }
    return {
        git:{
            registry:{
                array:[
                    'chenqf/vue-design'
                ]
            }
        }
    };
}