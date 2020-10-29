const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require('dotenv').config()

let app = express();


app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors({origin: "*", methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS", preflightContinue: false, optionsSuccessStatus: 204}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    next();
});

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/", (req, res) => {
    return res.status(200).json({msg: "Welcome to the AMI Analytics API."});
});

// app.use(function (err, req, res, next) {
//     res.status(500).send("Something wrong broke!");
//     console.log(err);
// });

// app.use("/api/v1/users", userRoute);

const port = process.env.PORT || 80;
//const port = 80
const server = app.listen(port, () => console.log(`app Running on ${port}`));

// process.on("exit", () => server.close());
// process.on("SIGTERM", () => server.close());
// process.on("uncaughtException", () => server.close());

 module.exports = app;
