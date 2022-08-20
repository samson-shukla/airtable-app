import "dotenv/config";

export const appSettings = {
  airtableApiKey: process.env.AIRTABLE_API_KEY,
  airtableBaseId: process.env.AIRTABLE_BASE_ID,
  airtableTableName: "Table 01",
  airtableViewName: "All products",
};
