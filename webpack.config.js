module.exports = {
    entry: [
        './src/async/async',
        './src/async/parallel',
        './src/rules/default-rules',
        './src/rules/interface',
        './src/rules/manager',
        './src/rules/rule',
        './src/dom-manager',
        './src/error',
        './src/validator',
        './src/message'
    ],
    output: {
        filename: './dist/validator.dist.js'
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