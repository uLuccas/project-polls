const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const pollsRoutes = require('./routes/routes');

app.use('/api/polls', pollsRoutes)


app.listen(3000, () => {
  console.log("Server On!");
});
