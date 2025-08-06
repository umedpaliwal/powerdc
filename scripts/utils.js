const fs = require("fs");
const path = require("path");

// Input file path
const inputFile = path.join(
  "/Users/tinker/Downloads",
  "existing_re_final_results.geojson"
);

/**
 * Function to get the min and max values of a property in GeoJSON features
 * @param {string} property - The property to extract min/max values for
 * @returns {object} - { min: <value>, max: <value> }
 */
const getMinMaxOfProperty = (property) => {
  try {
    // Read GeoJSON file
    const data = fs.readFileSync(inputFile, "utf8");
    const geojson = JSON.parse(data);

    // Extract property values (filter out null/undefined values)
    const values = geojson.features
      .map((feature) => feature.properties?.[property])
      .filter((value) => typeof value === "number"); // Ensure only numeric values

    if (values.length === 0) {
      console.log(
        `Property "${property}" not found or contains no valid numerical data.`
      );
      return null;
    }

    // Compute min and max
    const min = Math.min(...values);
    const max = Math.max(...values);

    console.log(`Property: ${property} → Min: ${min}, Max: ${max}`);
    return { min, max };
  } catch (error) {
    console.error("Error processing the GeoJSON file:", error);
    return null;
  }
};

// Example usage
const propertyToCheck = "capacity_mw"; // Change this to the property you want to check
getMinMaxOfProperty(propertyToCheck);
