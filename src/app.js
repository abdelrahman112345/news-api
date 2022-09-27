const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("./db/mongoose");

app.use(express.json());

const journalistRouter = require("./routers/journalist");
const newsRouter = require("./routers/news");
app.use(journalistRouter);
app.use(newsRouter);

app.listen(port, () => {
  console.log(`Server is running on localhost:${port}`);
});
