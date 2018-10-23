const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/testDB", {
    useNewUrlParser: true
});

require("./routes/api-routes")(app);

const PORT = process.env.PORT || 8080;
const host = "localhost";
app.listen(PORT, host, function () {
    console.log("App running on http://" + host + ":" + PORT);
});