"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var app = express_1["default"]();
var port = process.env.port || 5000;
app.set('view engine', 'hbs');
app.set('views', path_1["default"].join(__dirname, 'views'));
app.use(express_1["default"].static(path_1["default"].join(__dirname, 'public')));
app.get('/', function (req, res, next) {
    res.render('login', { title: 'This is a test' });
});
app.listen(port);
console.log("App running on port " + port);
