const gulp = require('gulp');
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer')
const pxtoviewport = require('postcss-px-to-viewport');
const writeSvg = require('postcss-write-svg');
const sourcemaps = require('gulp-sourcemaps');
let tsc = require('gulp-typescript')
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
let reload = browserSync.reload
const tsProject = tsc.createProject('tsconfig.json')

// 复制当前路径下的html文件到dist/目录中
gulp.task('copyStatic', function () {
  return gulp.src(['src/*.html', 'src/assets/**/*'],{ base:'./src' })
    .pipe(gulp.dest('dist'))
    .pipe(reload({
      stream: true
    }))
})

// 将src/css/路径下的所有.styl文件编译为css文件
gulp.task('stylusToCss', function () {
  return gulp.src('src/css/**/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/style'))
    // .pipe(reload({
    //   stream: true
    // }))
})

gulp.task('postcss', ['stylusToCss'], function() {
  let postcssPlugins = [
    writeSvg({}),    
    autoprefixer({browsers: ['last 2 versions']}),
    pxtoviewport({
    	viewportWidth: 750, 
    	viewportHeight: 1334, 
    	unitPrecision: 6, 
    	viewportUnit: 'vw', 
    	selectorBlackList: ['.ignore'], 
    	minPixelValue: 1, 
    	mediaQuery: false
    }),
  ];

  return gulp.src('dist/style/**/*.css')
  .pipe(sourcemaps.init())
  .pipe(postcss(postcssPlugins))
  .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest('dist/css'))
  .pipe(reload({
    stream: true
  }))
})

// 将src/javascript/es6 路径下的所有 .js 使用babel将es6语法转化为es5语法
gulp.task('useBabel', function () {
  return gulp.src('src/javascript/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['env', {
        "modules": false,
        // "modules": 'amd',
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }],
      plugins: ["transform-runtime"]
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/javascript'))
    .pipe(reload({
      stream: true
    }))
})

// 将 src/javascript/ts 下的.ts文件编译为 .js 文件
gulp.task('typescriptToJs', function () {
  let tsResult = gulp.src('src/javascript/**/*.ts')
    .pipe(sourcemaps.init()).pipe(tsProject())
  return tsResult.js.pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist/javascript'))
    .pipe(reload({
      stream: true
    }))
})

// 使用browserSync实现文件改动后，浏览器自动刷新
gulp.task('watch', ['copyStatic', "useBabel", 'typescriptToJs', 'postcss'], function () {
  browserSync.init({
    server: {
      baseDir: './', // 设置服务器的根目录
    },
    port: 8050 // 指定访问服务器的端口号
  });
  gulp.watch(['src/*.html', 'src/assets/**/*'], ['copyStatic'])
  gulp.watch('src/css/**/*.styl', ['stylusToCss', 'postcss'])
  gulp.watch('src/javascript/**/*.ts', ['typescriptToJs'])
  gulp.watch('src/javascript/**/*.js', ['useBabel'])
})

gulp.task('start', ['copyStatic', 'stylusToCss', "useBabel", 'typescriptToJs', 'postcss', 'watch'])