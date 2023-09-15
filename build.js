const { build } = require("esbuild");
const { dependencies = {}, peerDependencies = {} } = require('./package.json')

const sharedConfig = {
  entryPoints: ["src/server.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
};
build({
  ...sharedConfig,
  platform: 'node',
  outfile: "dist/server.js",
});
build({
  ...sharedConfig,
  outfile: "dist/server.esm.js",
  platform: 'neutral',
  format: "esm",
});