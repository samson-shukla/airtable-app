import airtable from "airtable";

import { appSettings } from "../config/appConfig.js";
import { saveLocal } from "../utils/saveLocal.js";

airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: appSettings.airtableApiKey,
});

const base = airtable.base(appSettings.airtableBaseId);

export const fetchAirtableData = (req, res) => {
  const airtableData = [];

  base(appSettings.airtableTableName)
    .select({
      // You can limit no. of records by using maxRecords:
      maxRecords: 5,
      view: appSettings.airtableViewName,
    })
    .eachPage(
      function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
          // Custom fetching of data based on Table fields. Here, table fields "Item Name", "Category" and "Images" have been selected
          // Feel free to add, remove and change data field names as per your Airtable headings
          const fetchedData = {
            partNo: record.get("Item Name"),
            category: record.get("Category"),
            image: record.get("Images")[0].url,
          };

          airtableData.push(fetchedData);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        try {
          fetchNextPage();
        } catch {
          console.log("Reached till end of the document!");
          return;
        }
      },
      function done(err) {
        if (err) {
          console.error(err);
          res.send({ message: "Got error!" });
          return;
        }
        saveLocal(airtableData);
        res.send(JSON.stringify(airtableData));
      }
    );
};
