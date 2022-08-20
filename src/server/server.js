import express from "express";
import bodyParser from "body-parser";

import { fetchAirtableData } from "../controller/airtable.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Airtable API Listening!");
});

app.get("/fetch-airtable-data", fetchAirtableData);

app.listen(PORT, () => {
  console.log(`App listening on PORT number ${PORT}`);
});
