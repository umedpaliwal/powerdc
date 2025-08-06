const fs = require("fs");
const path = require("path");

// Input and output file paths
const inputFile = path.join(
  "/Users/tinker/Downloads",
  "existing_re_final_results.geojson"
);
const outputFile = path.join(__dirname, "normalized_re_plants.geojson");

// Function to normalize text encoding and remove diacritics
const normalizeText = (text) => {
  return text
    .normalize("NFKD") // Convert to UTF format
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents)
    .trim(); // Trim spaces
};

// Function to calculate Levenshtein distance-based similarity
const stringSimilarity = (str1, str2) => {
  const len1 = str1.length;
  const len2 = str2.length;
  const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

  for (let i = 0; i <= len1; i++) dp[i][0] = i;
  for (let j = 0; j <= len2; j++) dp[0][j] = j;

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }

  const maxLen = Math.max(len1, len2);
  return (1 - dp[len1][len2] / maxLen) * 100; // Similarity as percentage
};

// Function to group similar owners dynamically
const groupSimilarOwners = (owners) => {
  const uniqueOwners = new Map();

  owners.forEach((owner) => {
    const normalizedOwner = normalizeText(owner);
    let matchedKey = null;

    // Check for an existing similar owner (fuzzy & substring-based matching)
    for (const existing of uniqueOwners.keys()) {
      if (
        stringSimilarity(normalizedOwner, existing) >= 80 || // Fuzzy matching
        normalizedOwner.includes(existing) || // Substring match
        existing.includes(normalizedOwner)
      ) {
        matchedKey = existing;
        break;
      }
    }

    if (matchedKey) {
      uniqueOwners.set(matchedKey, [
        ...uniqueOwners.get(matchedKey),
        normalizedOwner,
      ]);
    } else {
      uniqueOwners.set(normalizedOwner, [normalizedOwner]);
    }
  });

  // Create a mapping of all variations to a single representative name
  const ownerMapping = {};
  uniqueOwners.forEach((variations, representative) => {
    variations.forEach((variation) => {
      ownerMapping[variation] = representative;
    });
  });

  return ownerMapping;
};

// Read and process the GeoJSON file
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the GeoJSON file:", err);
    return;
  }

  try {
    const geojson = JSON.parse(data);

    // Extract all owner names
    const ownerNames = geojson.features
      .map((feature) => feature.properties?.owner)
      .filter((owner) => owner); // Remove undefined/null values

    // Generate the owner normalization mapping
    const ownerMapping = groupSimilarOwners(ownerNames);
    console.log("Generated Owner Mapping:", ownerMapping);

    // Add a `normalized_owner` field while keeping `owner`
    geojson.features = geojson.features.map((feature) => {
      if (feature.properties && feature.properties.owner) {
        const normalizedOwner = normalizeText(feature.properties.owner);
        feature.properties.normalized_owner =
          ownerMapping[normalizedOwner] || normalizedOwner;
      }
      return feature;
    });

    // Save the updated GeoJSON
    fs.writeFile(
      outputFile,
      JSON.stringify(geojson, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing the output GeoJSON file:", writeErr);
        } else {
          console.log("Final normalized owner data saved to", outputFile);
        }
      }
    );
  } catch (parseError) {
    console.error("Error parsing the GeoJSON file:", parseError);
  }
});
