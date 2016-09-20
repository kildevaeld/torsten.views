
const gulp = require('gulp'),
    wpstream = require('webpack-stream'),
    babel = require('babel-loader'),
    webpack = require('webpack'),
    merge = require('merge2'),
    tsc = require('gulp-typescript');

var JsonpTemplatePlugin = require('../../node_modules/webpack/lib/JsonpTemplatePlugin');
var FunctionModulePlugin = require('../../node_modules/webpack/lib/FunctionModulePlugin');
var NodeTargetPlugin = require('../../node_modules/webpack/lib/node/NodeTargetPlugin');
var NodeTemplatePlugin = require('../../node_modules/webpack/lib/node/NodeTemplatePlugin');
var LoaderTargetPlugin = require('../../node_modules/webpack/lib/LoaderTargetPlugin');


var webpackNode = {
    // do not include poly fills...
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: true
};


gulp.task('gui:webpack', ['gui:typescript'], () => {
    var output = {
        library: ['torsten', 'views'],
        libraryTarget: 'umd',
        filename: 'torsten.views.js'
    }
    return gulp.src('lib/index.js')
        .pipe(wpstream({
            output: output,
            target: function (compiler) {
                compiler.apply(
                    new JsonpTemplatePlugin(output),
                    new FunctionModulePlugin(output),
                    new NodeTemplatePlugin(output),
                    new NodeTargetPlugin(webpackNode),
                    new LoaderTargetPlugin('web')
                );
            },
            node: webpackNode,
            module: {
                loaders: [
                    { test: /\.json/, loader: 'json-loader' },
                    { test: /stream.js$/, loader: 'ignore-loader' },
                    { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },

                ]
            },

            externals: {
                "orange": "orange",
                "orange.request": ['orange', 'request'],
                "views": "views",
                "collection": "collection",
                "cropperjs": "cropperjs",
                "blazy": "blazy",
                "torsten": "torsten"
            }
        })).pipe(gulp.dest('dist'))
});

gulp.task('gui:webpack:bundle', ['gui:typescript'], () => {
    var output = {
        library: ['torsten', 'views'],
        libraryTarget: 'umd',
        filename: 'torsten.views.bundle.js'
    }
    return gulp.src('lib/index.js')
        .pipe(wpstream({
            output: output,
            /*target: function (compiler) {
                compiler.apply(
                    new JsonpTemplatePlugin(output),
                    new FunctionModulePlugin(output),
                    new NodeTemplatePlugin(output),
                    new NodeTargetPlugin(webpackNode),
                    new LoaderTargetPlugin('web')
                );
            },*/
            module: {
                loaders: [
                    { test: /\.json/, loader: 'json-loader' },
                    { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },

                ]
            },
            resolve: {
                alias: {
                    "orange.request": process.cwd() + "/node_modules/orange.request/dist/orange.request.js"
                }
            }
        })).pipe(gulp.dest('dist'))
});

gulp.task('gui:typescript', ['gui:templates'], () => {
    var project = tsc.createProject('tsconfig.json')

    let p = project.src()
        .pipe(tsc(project))


    return merge([
        p.js.pipe(gulp.dest('lib')),
        p.dts.pipe(gulp.dest('lib'))
    ]);

})

gulp.task('gui:default', ['gui:webpack', 'gui:webpack:bundle', 'gui:styles'])


gulp.task('gui:watch', ['gui:templates:watch', 'gui:styles:watch'], () => {
    gulp.watch('./src/**/*.ts', ['gui:webpack:bundle', 'gui:webpack'])
})