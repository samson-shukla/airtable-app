import airtable from "airtable";

import { appSettings } from "../config/appConfig.js";
import { saveLocal } from "../utils/saveLocal.js";

airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: appSettings.airtableApiKey,
});

const base = airtable.base(appSettings.airtableBaseId);

// PREFERABLE WAY OF EXTRACTING AIRTABLE DATA IN A SORTED ORDER
export const fetchData = (req, res) => {
  let fetchedData = [];

  try {
    base(appSettings.airtableTableName)
      .select({
        view: appSettings.airtableViewName,
      })
      .eachPage(
        (records, fetchNextPage) => {
          records.forEach((record) => {
            // console.log("record", record.fields);
            fetchedData.push(record.fields);
          });

          console.log("fetching data ...");

          setTimeout(() => {
            fetchNextPage();
          }, 4000);
        },
        (err) => {
          if (err) {
            console.error(err);
            res.status(404).json({ Error: err });
          } else {
            saveLocal(fetchedData);
            res.status(200).json(fetchedData);
          }
        }
      );
  } catch (err) {
    console.log("Caught error while fetching Airtable Data", err);
    res.status(404);
  }
};
