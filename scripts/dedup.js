const fs = require("fs");
const path = require("path");

// Load the JSON data
const inputFile = path.join(__dirname, "extracted_data.json");
const outputFile = path.join(__dirname, "deduplicated_data.json");

// Read the JSON file
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Deduplicate features using a composite key
    const uniqueFeatures = new Map();
    jsonData.forEach((feature) => {
      if (!feature.properties) return;

      // Create a composite key using `fac_id_eia` and `eia_unit_id`
      const key = `${feature.properties.fac_id_eia}_${feature.properties.eia_unit_id}`;
      if (!uniqueFeatures.has(key)) {
        uniqueFeatures.set(key, feature);
      }
    });

    // Convert the deduplicated features back to an array
    const deduplicatedData = Array.from(uniqueFeatures.values());

    // Write the deduplicated data to a new JSON file
    fs.writeFile(
      outputFile,
      JSON.stringify(deduplicatedData),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing the deduplicated JSON file:", writeErr);
        } else {
          console.log("Deduplicated data saved to", outputFile);
        }
      }
    );
  } catch (parseError) {
    console.error("Error parsing the JSON file:", parseError);
  }
});
