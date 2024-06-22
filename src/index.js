import './index.env.js';

import { createApp } from 'vue';

import './lib/day.pure.js';

import { brop } from '@nuogz/utility';
import { aegis } from '@nuogz/aegis';
import { install as installAlert, $alert } from '@nuogz/vue-alert';
import { install as installTip } from '@nuogz/vue-tip';
import { install as installMenu } from './lib/menu.js';
import { install as installWocker } from '@nuogz/wock-client';
import { install as installModuleLoader } from './lib/load-module.js';

import Root from './index.vue';



const app = createApp(Root);
app.provide('app', app);


const init = async () => {
	app.mixin({ data() { return { brop }; } });

	aegis.alert = $alert;

	await installAlert(app, $alert);
	await installTip(app);
	await installMenu(app);
	await installWocker(app);
	await installModuleLoader(app);


	app.mount('#app');
};

if(document.readyState == 'complete') { await init(); }
else { window.addEventListener('load', init); }
