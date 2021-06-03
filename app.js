const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator');
var flash = require('connect-flash');
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const uuidv1 = require('uuid/v1');
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser('secret'));
app.use(session({
    genid: function(req) {
        return uuidv1() // use UUIDs for session IDs
    },
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,

    cookie: { maxAge: 300000 }
}))

app.use(flash());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});