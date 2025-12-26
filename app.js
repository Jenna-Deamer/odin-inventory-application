const express = require("express");
const path = require("node:path");

const app = express();
const PORT = 3000;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


const gameRouter = require("./routes/gameRouter");

app.use("/", gameRouter);

app.listen(PORT, () => {
    console.log(`Express app listening on ${PORT}`);
});