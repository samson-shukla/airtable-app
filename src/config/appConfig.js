import "dotenv/config";

export const appSettings = {
  airtableBaseId: process.env.AIRTABLE_BASE_ID,
  airtableToken: process.env.AIRTABLE_TOKEN,
  airtableTableName: process.env.AIRTABLE_TABLE_NAME,
  airtableViewName: process.env.AIRTABLE_VIEW_NAME,

  sortBy: "item_code",
};
