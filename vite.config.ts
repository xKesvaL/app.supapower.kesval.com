import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { kitRoutes } from 'vite-plugin-kit-routes';

export default defineConfig({
	plugins: [
		sveltekit(),
		kitRoutes({
			extra_search_params: 'with'
		})
	],
	resolve: {
		alias: {
			$routes: resolve('./src/routes'),
			$design: resolve('./node_modules/@kesval/design/scss/utilities')
		}
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "node_modules/@kesval/design/scss/utilities" as *;'
			}
		}
	}
});
