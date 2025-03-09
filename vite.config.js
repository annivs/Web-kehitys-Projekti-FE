// vite.config.js
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				about: resolve(__dirname, 'src/pages/OmatTiedot.html'),
                auth: resolve(__dirname, 'src/pages/Kirjaudu.html'),
                analysis: resolve(__dirname, 'src/pages/Analyysi.html')
			},
		},
	},
	base: './',
});