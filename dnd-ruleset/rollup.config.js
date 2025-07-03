const typescript = require('@rollup/plugin-typescript');

module.exports = {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/index.esm.js',
            format: 'es'
        }
    ],
    plugins: [
        typescript(),
    ],
    external: [/node_modules/]
};