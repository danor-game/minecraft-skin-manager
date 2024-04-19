import '@nuogz/pangu/index.js?i18n&config=_,.db&log';
import { dirWorking, C, G } from '@nuogz/pangu';

import { resolve } from 'path';

import Desire from '@nuogz/desire';
import readRoute from '@nuogz/desire-route';

import './lib/db.js';



const { folds, faces } = await readRoute(resolve(dirWorking, 'src'));


const desire = await new Desire({
	name: 'Server',
	host: C.server.host,
	port: C.server.port,

	/** @type {import('@nuogz/desire-harbour').HarbourOption} */
	harbour: {
		mare: {
			before: ['parseRaw'],
			after: ['toSuccess'],
		},

		facePrefix: '/api',

		faces,
		folds,

		wock: {
			disable: false,
			route: 'wock',
			ping: false,
		},
	},

	logger: { logger: G },
});

desire.start();
