'use strict';

const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Webpack = require('webpack');

const UglifyJsPlugin = Webpack.optimize.UglifyJsPlugin;
const CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
const ProvidePlugin = Webpack.ProvidePlugin;

Gulp.task('webpack', function() {

    var production = process.env.NODE_ENV === 'production';

    const config = {
        entry: {
            vendor: ['jquery', 'd3'],
            app: './assets/scripts/index.js'
        },
        watch: true,
        cache: true,
        output: {
            path: '.build/js/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [{
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/
            }]
        },
        debug: !production,
        devtool: production ? false : 'source-map',
        plugins: [
            new UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                'root.jQuery': 'jquery'
            }),
            new CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js',
                minChunks: 2
            })
        ]
    };

    Webpack(config, function(err, stats) {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }
        Gutil.log('[webpack]', stats.toString({
            colors: true
        }));
    });


});
