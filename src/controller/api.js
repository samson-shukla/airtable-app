import fs from "fs";

import { convertToPdf } from "../utils/convertToPdf.js";

export const convertDataToPdf = (req, res) => {
  const fileName = "src/data/airtableData.json";
  fs.readFile(fileName, "utf8", (err, jsonData) => {
    if (err) {
      return console.log("Encountered error!");
    } else {
      convertToPdf(JSON.parse(jsonData));
      //   res.send({ message: jsonData });
    }
  });

  res.send({ message: "Converted to PDF!" });
};
