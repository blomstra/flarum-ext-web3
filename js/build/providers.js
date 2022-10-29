#!/usr/bin/env node

// esbuild ./build/web3-providers.js --bundle --format=esm --sourcemap --main-fields=browser,module,main --define:process.env.NODE_ENV='production' --inject:./build/node-globals.js --splitting --outdir=../assets

const GlobalsPolyfills = require('@esbuild-plugins/node-globals-polyfill').default;
const NodeModulesPolyfills = require('@esbuild-plugins/node-modules-polyfill').default;

require('esbuild')
  .build({
    entryPoints: ['./build/web3-providers.js'],
    bundle: true,
    format: 'esm',
    sourcemap: true,
    mainFields: ['browser', 'module', 'main'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    // inject: ['node-globals.js'],
    splitting: true,
    outdir: '../assets',
    plugins: [
      GlobalsPolyfills({
        process: true,
        buffer: true,
        define: {},
      }),
      NodeModulesPolyfills(),
    ],
  })
  .catch(() => process.exit(1));