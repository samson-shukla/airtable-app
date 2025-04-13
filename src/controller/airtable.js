import axios from "axios";

import { appSettings } from "../config/appConfig.js";
import { saveDataToFile } from "../utils/fileUtils.js";

export const fetchAirtableData = async (req, res) => {
  const endpointUrl = `https://api.airtable.com/v0/${appSettings.airtableBaseId}/${appSettings.airtableTableName}?sort%5B0%5D%5Bfield%5D=${appSettings.sortBy}`;
  let airtableData = [];

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${appSettings.airtableToken}`,
        "Content-Type": "application/json",
      },
    };

    let axiosCall = await axios.get(endpointUrl, options);

    if (axiosCall?.status === 200) {
      airtableData = axiosCall?.data.records;
      let offset = axiosCall?.data.offset;

      while (offset) {
        console.log("Fetching next page with offset", offset);
        let newPageAxiosCall = await axios.get(
          `${endpointUrl}&offset=${offset}`,
          options
        );

        if (newPageAxiosCall?.status === 200) {
          airtableData = airtableData.concat(newPageAxiosCall?.data.records);
          offset = newPageAxiosCall?.data.offset;
        } else {
          console.error("Failed to fetch the next page");
          break;
        }
      }

      // Writing airtable data to file
      saveDataToFile("airtableData.json", airtableData);

      res.status(200).json(airtableData);
    } else {
      res.status(404).send("Failed to fetch Airtable data");
    }
  } catch (err) {
    if (err?.response) {
      console.error(
        "fetchAirtableData catch err?.response?.status",
        err?.response?.status
      );
      console.error(
        "fetchAirtableData catch err?.response?.statusText",
        err?.response?.statusText
      );
      console.error(
        "fetchAirtableData catch err?.response?.data",
        err?.response?.data
      );

      res
        .status(502)
        .send(
          `Caught error in Airtable's table data. ${
            err?.response?.data?.error?.message || "Please contact the admin."
          }`
        );
    } else {
      console.error(
        "fetchAirtableData catch err?.response",
        err?.response || err
      );

      res
        .status(500)
        .send(
          "Caught error while retreiving the airtable data. Please contact the admin."
        );
    }
  }
};
