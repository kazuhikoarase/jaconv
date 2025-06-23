import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: [ '**/*.spec.ts', ],
  plugins: [ esbuildPlugin({ ts: true }) ],
  nodeResolve: true,
  coverage : true,
};
