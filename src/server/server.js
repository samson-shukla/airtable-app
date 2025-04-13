import express from "express";
import "dotenv/config";

import { fetchAirtableData } from "../controller/airtable.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Airtable App is Live ✨");
});

app.get("/fetch-airtable-data", fetchAirtableData);

app.listen(PORT, () => {
  console.log(`App listening on PORT number ${PORT}`);
});
