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
        './src/validate-input',
        './src/validate-input-group'
    ],
    output: {
        filename: './dist/validator.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};