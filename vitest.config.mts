import path from 'path';
import swc from 'unplugin-swc';

import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    cache: {
      dir: path.resolve(__dirname, '.vitest'),
    },
    environment: 'node',
    reporters: ['verbose', 'html'],
    outputFile: {
      html: '.vitest/report.html',
    },
    chaiConfig: {
      truncateThreshold: 0,
    }
  },
  plugins: [
    swc.vite({
      // module: { type: 'es6' },
    }) as any,
    tsconfigPaths(),
  ],
});
