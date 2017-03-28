module.exports = {
    entry: [
        './src/async/async',
        './src/async/parallel',
        './src/rules/default-rules',
        './src/rules/manager',
        './src/rules/validate-rule',
        './src/dom-manager/input',
        './src/dom-manager/form',
        './src/error',
        './src/validator',
        './src/message/message',
        './src/message/template',
        './src/validate-input'
    ],
    output: {
        filename: './dist/validator.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};