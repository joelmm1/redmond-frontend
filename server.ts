import 'zone.js/dist/zone-node';
import '@ng-web-apis/universal/mocks';
import './server/main';
import { global } from '@angular/compiler/src/util';
export * from './src/main.server';

(global as any).WebSocket = require('ws');
(global as any).XMLHttpResponse = require('xhr2'); 