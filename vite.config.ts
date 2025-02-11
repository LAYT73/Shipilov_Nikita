import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
                // additionalData: `@import "src/styles/variables.scss";`,
            },
        },
        postcss: {
            plugins: [autoprefixer()],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
});
