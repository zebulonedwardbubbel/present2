import path from 'path';
import webpack from 'webpack';

const config = {
    entry: './js/main.js',
    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, '../')
    },
    context: path.resolve(__dirname, '../src'),
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [new webpack.optimize.UglifyJsPlugin()] : []
};

function scripts() {
    return new Promise(resolve => webpack(config, (err, stats) => {
        if (err) {
            console.log('Webpack', err);
        } else {
            console.log(stats.toString({
                stats: 'normal',
                colors: true
            }));
        }
        resolve();
    }));
}

module.exports = {
    scripts,
    config
};
