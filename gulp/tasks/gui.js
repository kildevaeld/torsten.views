const gulp = require('gulp'),
    wpstream = require('webpack-stream'),
    //babel = require('babel-loader'),
    webpack = require('webpack'),
    merge = require('merge2'),
    tsc = require('gulp-typescript'),
    babel = require('gulp-babel'),
    bump = require('gulp-bump');

var JsonpTemplatePlugin = require('../../node_modules/webpack/lib/JsonpTemplatePlugin');
var FunctionModulePlugin = require('../../node_modules/webpack/lib/FunctionModulePlugin');
var NodeTargetPlugin = require('../../node_modules/webpack/lib/node/NodeTargetPlugin');
var NodeTemplatePlugin = require('../../node_modules/webpack/lib/node/NodeTemplatePlugin');
var LoaderTargetPlugin = require('../../node_modules/webpack/lib/LoaderTargetPlugin');


gulp.task('bump', () => {
    return gulp.src('./package.json')
        .pipe(bump())
        .pipe(gulp.dest('./'));
});


var webpackNode = {
    // do not include poly fills...
    console: false,
    process: false,
    global: false,
    buffer: false,
    __filename: false,
    __dirname: true
};


gulp.task('webpack', ['typescript'], () => {
    var output = {
        library: ['torsten', 'views'],
        libraryTarget: 'umd',
        filename: 'torsten.views.js'
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
            },
            node: webpackNode,
            module: {
                loaders: [
                    { test: /\.json/, loader: 'json-loader' },
                    { test: /stream.js$/, loader: 'ignore-loader' },
                    { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },

                ]
            },*/
            /*resolve: {
                alias: {
                    "debug": process.cwd() + "/node_modules/debug/browser.js",
                    //"cropperjs": process.cwd() + "/node_modules/cropperjs/src/js/cropper.js"
                }
            },*/
            externals: {
                "orange": "orange",
                "orange.request": {
                    root: ['orange', 'request'],
                    commonjs2: 'orange.request',
                    commonjs: 'orange.request',
                    amd: 'orange.request'
                },
                "orange.dom": {
                    root: ['orange', 'dom'],
                    commonjs2: 'orange.dom',
                    commonjs: 'orange.dom',
                    amd: 'orange.dom'
                },
                "views": "views",
                "collection": "collection",

                "torsten": "torsten",
                "views.form": {
                    root: ['views', 'form'],
                    commonjs2: 'views.form',
                    commonjs: 'views.form',
                    amd: 'views.form'
                },
                eventsjs: "eventsjs"
            }
        })).pipe(gulp.dest('dist'))
});

gulp.task('webpack:bundle', ['typescript'], () => {
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
            /*module: {
                loaders: [
                    { test: /\.json/, loader: 'json-loader' },
                    { test: /\.js$/, loader: 'babel', query: { presets: ['es2015'] } },

                ]
            },*/
            resolve: {
                alias: {
                    "orange.request": process.cwd() + "/node_modules/orange.request/lib/browser.js",
                    //"debug": process.cwd() + "/node_modules/debug/browser.js",
                    //"cropperjs": process.cwd() + "/node_modules/cropperjs/src/js/cropper.js"
                }
            }
        })).pipe(gulp.dest('dist'))
});

gulp.task('typescript', ['templates'], () => {
    var project = tsc.createProject('tsconfig.json', {
        typescript: require('typescript')
    });

    let p = project.src()
        .pipe(tsc(project))

    let js = p.js
        .pipe(babel({
            presets: ['es2015']
        }));


    return merge([
        js.pipe(gulp.dest('lib')),
        p.dts.pipe(gulp.dest('lib'))
    ]);

})

gulp.task('default', ['webpack', 'webpack:bundle', 'styles', 'templates'])


gulp.task('watch', ['templates:watch', 'styles:watch'], () => {
    gulp.watch('./src/**/*.ts', ['webpack:bundle', 'webpack'])
})