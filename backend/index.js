const connectToDB = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToDB();

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`BirthdayBuddy Backend listening at http://localhost:${port}`)
})