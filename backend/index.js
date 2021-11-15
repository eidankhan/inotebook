// Express Server code goes in this file

const connectoMongodb = require("./db");
const express = require("express");
var cors = require('cors')

connectoMongodb();
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())

// AVAILABLE ROUTES
app.use("/api/auth", require("./routes/authorization"));
app.use("/api/notes", require("./routes/note"));

app.listen(port, () => {
  console.log(`iNotebook app listening at http://localhost:${port}`);
});
