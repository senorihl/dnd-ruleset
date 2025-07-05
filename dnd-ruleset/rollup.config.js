const typescript = require('@rollup/plugin-typescript');
const json = require("@rollup/plugin-json");
const terser = require("@rollup/plugin-terser");

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true
        },
        {
            file: 'dist/index.esm.js',
            format: 'es',
            sourcemap: true
        }
    ],
    plugins: [
        typescript(),
        json(),
        terser()
    ]
};