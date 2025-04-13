import fs from "fs";
import path from "path";

export const saveDataToFile = (filename, data) => {
  const filePath = path.resolve("data", filename); // <== saving to root/data

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(`✅ Airtable data saved to ${filePath}`);
    }
  });
};
