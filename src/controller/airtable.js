import axios from "axios";

import { appSettings } from "../config/appConfig.js";

export const fetchAirtableData = async (req, res) => {
  const endpointUrl = `https://api.airtable.com/v0/${appSettings.airtableBaseId}/${appSettings.airtableTableName}`;
  let airtableData = [];

  try {
    const options = {
      headers: {
        Authorization: `Bearer ${appSettings.myAirtableConnectorsCatalogToken}`,
        "Content-Type": "application/json",
      },
    };

    let axiosCall = await axios.get(endpointUrl, options);

    if (axiosCall.status === 200) {
      airtableData = axiosCall.data.records;

      // Calling next page "ONLY ONE TIME HERE" if it exists
      if (axiosCall.data.offset !== "") {
        let newPageAxiosCall = await axios.get(
          `${endpointUrl}?offset=${axiosCall.data.offset}`,
          options
        );

        airtableData.concat(newPageAxiosCall.data.records);
      }

      res.status(200).json(airtableData);
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(
      "Caught error while fetching Airtable Data",
      err.code,
      err.response.statusText
    );
  }
};
