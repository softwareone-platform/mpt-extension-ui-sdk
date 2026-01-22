import { build } from 'esbuild';

build({
  entryPoints: ['./src/index.ts'],
  outdir: './dist',
  bundle: true,
  platform: 'node',
  format: 'esm',
  sourcemap: true,
  allowOverwrite: true,
}).catch((e) => {
  console.error(e);
  process.exit(1)
});