import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';

export default [
  // This `main.js` file we wrote
  {
    input: 'src/main.js',
    output: {
      // The destination for our bundled JavaScript
      file: 'public/build/bundle.js',
      // Our bundle will be an Immediately-Invoked Function Expression
      format: 'iife',
      // The IIFE return value will be assigned into a variable called `app`
      name: 'app',
    },
    plugins: [
      svelte({
        // Tell the svelte plugin where our svelte files are located
        include: 'src/**/*.svelte',
      }),
      css({ output: 'bundle.css' }),
      // Tell any third-party plugins that we're building for the browser
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
    ],
  },
  // This is the options page
  {
    input: "src/options.js",
    output: {
      sourcemap: true,
      format: "iife",
      file: "public/build/options.js",
      name: "options"
    },
    plugins: [
      svelte({
        // Tell the svelte plugin where our svelte files are located
        include: 'src/**/*.svelte',
      }),
      css({ output: 'options.css' }),
      // Tell any third-party plugins that we're building for the browser
      resolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
    ]
  },
  // Background scripts
  {
    input: "src/background.ts",
    output: {
      sourcemap: true,
      format: "iife",
      file: "public/build/background.js",
    },
    plugins: [
      resolve({ browser: true }),
      typescript(),
      commonjs()],
  },
];