import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import {enableProdMode} from '@angular/core';

import {ngStatic} from './src/entry';

enableProdMode();

ngStatic('<h1>This is {{name}}!</h1>')({name: 'Angular'}).then(html => console.log(html));
