import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import { fetchData } from "../controller/fetchData.js";
// import { convertDataToPdf } from "../controller/api.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Airtable API Listening!");
});

app.get("/fetch-data", fetchData);
// app.get("/convert-data-to-pdf", convertDataToPdf);

app.listen(PORT, () => {
  console.log(`App listening on PORT number ${PORT}`);
});
