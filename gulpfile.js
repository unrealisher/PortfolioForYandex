"use strict";

const gulp = require("gulp");
const rename = require("gulp-rename");

const htmlmin = require("gulp-htmlmin");

const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const server = require("browser-sync").create();

sass.compiler = require("node-sass");

gulp.task("style", function() {
  return gulp
    .src("src/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest("public"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("public"))
    .pipe(server.stream());
});

gulp.task("html", function() {
  return gulp
    .src("src/index.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("public"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "./public/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("./src/**/*.{scss,sass}", gulp.parallel("style"));
  gulp.watch("./src/*.html", gulp.parallel("html"));
});
