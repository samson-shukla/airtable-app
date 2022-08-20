import fs from "fs";

export const saveLocal = (content) => {
  const fileName = "src/data/airtableData.json";
  fs.writeFile(fileName, JSON.stringify(content), (err) => {
    if (err) {
      console.log(
        `${new Date()} : An error occurred while writing JSON Object to File.`
      );
    } else {
      console.log("JSON file has been saved successfully.");
    }
    return;
  });
};
