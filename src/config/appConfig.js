import "dotenv/config";

export const appSettings = {
  airtableApiKey: process.env.AIRTABLE_API_KEY,
  airtableBaseId: process.env.AIRTABLE_BASE_ID,
  airtableTableName: "Wired Connectors",
  airtableViewName: "All products",
  myAirtableConnectorsCatalogToken: process.env.AIRTABLE_TOKEN,
};
