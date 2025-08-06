const fs = require("fs");
const path = require("path");

// Input and output file paths
const inputFile = path.join(
  "/Users/tinker/Downloads",
  "existing_re_final_results.geojson"
);
const outputFile = path.join(__dirname, "extracted_data.json");

// Read the GeoJSON file and process it
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the GeoJSON file:", err);
    return;
  }

  try {
    // Parse the GeoJSON data
    const geojson = JSON.parse(data);

    // Extract features and transform them into the required structure
    const extractedData = geojson.features.map((feature) => {
      const {
        fac_id_eia,
        eia_unit_id,
        plant_name,
        state,
        county,
        utility_name_eia_pudl,
        rto_name,
        total_plant_capacity,
        technology,
        owner,
        capacity_mw,
        estimated_vc,
        capacity_factor,
        solar_crossover_year,
        wind_crossover_year,
        install_solar_capacity_mw_2030,
        install_wind_capacity_mw_2030,
        solar_lcoe_2024,
        wind_lcoe_2024,
        urban_area_perc,
        parent_company_name,
      } = feature.properties;

      const { type, coordinates } = feature.geometry;

      // Return the transformed feature
      return {
        properties: {
          fac_id_eia,
          eia_unit_id,
          plant_name,
          state,
          county,
          utility_name_eia_pudl,
          rto_name,
          total_plant_capacity,
          technology,
          owner,
          capacity_mw,
          estimated_vc,
          capacity_factor,
          solar_crossover_year,
          wind_crossover_year,
          install_solar_capacity_mw_2030,
          install_wind_capacity_mw_2030,
          solar_lcoe_2024,
          wind_lcoe_2024,
          urban_area_perc,
          parent_company_name,
        },
        geometry: {
          type,
          coordinates,
        },
      };
    });

    // Write the extracted data to the output JSON file
    fs.writeFile(
      outputFile,
      JSON.stringify(extractedData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing the output file:", err);
        } else {
          console.log("Data successfully extracted to", outputFile);
        }
      }
    );
  } catch (parseError) {
    console.error("Error parsing the GeoJSON file:", parseError);
  }
});
