const express = require("express");
const path = require("path");
const { cors, corsOptions } = require("./routes/cors");
const usersRouter = require("./routes/users");
const history = require("connect-history-api-fallback");

const app = express();
app.use(cors(corsOptions));
app.use("/api", usersRouter);
app.use(history());
app.use(express.static(path.join(__dirname, "../dist")));
app.listen(process.env.PORT || 81);
module.exports = app;
