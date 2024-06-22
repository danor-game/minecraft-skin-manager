import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import pluginVue from '@vitejs/plugin-vue';



const dirPackage = dirname(fileURLToPath(import.meta.url));
const PKG = JSON.parse(readFileSync(resolve(dirPackage, 'package.json'), 'utf-8'));

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			pluginVue({
				template: {
					compilerOptions: {
						isCustomElement: tag => /^((module-|comp-|p-).+?|module)$/.test(tag)
					}
				}
			})
		],
		define: { PACKAGE_VERSION: JSON.stringify(PKG.version) },
		root: resolve(dirPackage, 'src'),
		base: './',
		build: {
			target: 'esnext',
			outDir: resolve(dirPackage, 'dist'),
			emptyOutDir: true,
			chunkSizeWarningLimit: 1024,
			minify: true
		},
		optimizeDeps: {
			esbuildOptions: { target: 'esnext' }
		},
		publicDir: resolve(dirPackage, 'src', 'public'),
		clearScreen: false,
		server: {
			hmr: { port: 4588 },
			port: 4788,
			open: 'http://dev.mcsk.localhost/',
			proxy: {
				'^/api/': {
					target: 'http://127.0.0.1:14788',
					changeOrigin: true,
				},
				'/wock': {
					target: 'ws://127.0.0.1:14788/wock',
					ws: true
				},
			},
			watch: {
				ignored: [
					'**/*.{api,lib,map}.js',
					'**/*.lib/**/*.js'
				]
			}
		}
	};
});
