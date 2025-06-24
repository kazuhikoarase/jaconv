import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main/ts/jaconv.ts'),
      name: 'jaconv',
      fileName: 'jaconv',
    },
  },
  plugins: [
    dts({
      rollupTypes : true,
    })
  ]
});
