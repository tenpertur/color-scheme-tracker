const path = require('path')

module.exports = {
    entry: path.join(__dirname, "src/ColorSchemeTracker.jsx"),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'color-scheme-tracker.js',
        library: "ColorSchemeTracker",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/env', '@babel/preset-react'] },
                }
            }
        ]
    },
    plugins: [],
    resolve: {
        extensions: [".js", ".jsx"]
    }
}