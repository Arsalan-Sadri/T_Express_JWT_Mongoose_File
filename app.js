const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

app.use("/imgFolder", express.static("imgFolder"));

app.use(logger("dev"));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

mongoose.connect(
    "mongodb://localhost/userAuthDB",
    {
        useNewUrlParser: true
    }
);

app.use(routes);

const PORT = process.env.PORT || 8080;
const host = "localhost";
app.listen(PORT, host, function() {
    console.log(`App is running on http://${host}:${PORT}`);
});
