const fs = require("fs");
const path = require("path");

// Input and output file paths
const inputFile = path.join(__dirname, "normalized_re_plants.geojson");
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
        plant_name,
        technology,
        owner,
        operating_year,
        capacity_mw,
        utility_name,
        rto_name,
        county,
        state,
        is_battery,
        battery_capacity,
        latitude,
        longitude,
        solar_cf,
        wind_cf,
        recommended_config,
        optimal_solar_mw,
        optimal_wind_mw,
        optimal_battery_mw,
        optimal_battery_mwh,
        optimal_cf,
        solar_lcoe_2025,
        wind_lcoe_2025,
        solar_lcoe_2030,
        wind_lcoe_2030,
        potential_mw_solar,
        potential_mw_wind,
        urban_area_perc,
        normalized_owner,
      } = feature.properties;

      const { type, coordinates } = feature.geometry;

      // Return the transformed feature
      return {
        properties: {
          fac_id_eia,
          plant_name,
          technology,
          owner,
          operating_year,
          capacity_mw,
          utility_name,
          rto_name,
          county,
          state,
          is_battery,
          battery_capacity,
          latitude,
          longitude,
          solar_cf,
          wind_cf,
          recommended_config,
          optimal_solar_mw,
          optimal_wind_mw,
          optimal_battery_mw,
          optimal_battery_mwh,
          optimal_cf,
          solar_lcoe_2025,
          wind_lcoe_2025,
          solar_lcoe_2030,
          wind_lcoe_2030,
          potential_mw_solar,
          potential_mw_wind,
          urban_area_perc,
          normalized_owner,
        },
        geometry: {
          type,
          coordinates,
        },
      };
    });

    // Write the extracted data to the output JSON file
    fs.writeFile(outputFile, JSON.stringify(extractedData), "utf8", (err) => {
      if (err) {
        console.error("Error writing the output file:", err);
      } else {
        console.log("Data successfully extracted to", outputFile);
      }
    });
  } catch (parseError) {
    console.error("Error parsing the GeoJSON file:", parseError);
  }
});
