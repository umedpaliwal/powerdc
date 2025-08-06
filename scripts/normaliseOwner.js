const fs = require("fs");
const path = require("path");

// Input and output file paths
const inputFile = path.join(__dirname, "deduplicated_data.json");
const outputFile = path.join(__dirname, "final_normalized_owners.json");

// Function to normalize text encoding and remove diacritics
const normalizeText = (text) => {
  return text
    .normalize("NFKD") // Convert to UTF format
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (accents)
    .trim(); // Trim spaces
};

// Function to calculate similarity score (Levenshtein distance-based)
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

// Function to dynamically detect common suffixes
const findCommonSuffixes = (ownerNames) => {
  const suffixCounts = new Map();

  ownerNames.forEach((name) => {
    const words = name.split(" ");
    if (words.length > 1) {
      const suffix = words[words.length - 1]; // Get last word
      suffixCounts.set(suffix, (suffixCounts.get(suffix) || 0) + 1);
    }
  });

  return Array.from(suffixCounts.entries())
    .filter(([_, count]) => count >= 3) // If a word appears in at least 3 names, it's a suffix
    .map(([suffix]) => suffix);
};

// Function to group similar owners (≥ 80% similarity)
const groupSimilarOwners = (owners) => {
  const uniqueOwners = new Map();

  owners.forEach((owner) => {
    const normalizedOwner = normalizeText(owner);
    let matchedKey = null;

    // Check for an existing similar owner
    for (const existing of uniqueOwners.keys()) {
      if (stringSimilarity(normalizedOwner, existing) >= 40) {
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

// Read and process the JSON file
fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    // Extract all owner names
    const ownerNames = jsonData
      .map((feature) => feature.properties?.owner)
      .filter((owner) => owner); // Remove undefined/null values

    // Find common suffixes dynamically
    const commonSuffixes = findCommonSuffixes(ownerNames);
    console.log("Identified Common Suffixes:", commonSuffixes);

    // Generate the owner normalization mapping
    const ownerMapping = groupSimilarOwners(ownerNames);
    console.log("Generated Owner Mapping:", ownerMapping);

    // Normalize owner names using the mapping
    const processedData = jsonData.map((feature) => {
      if (feature.properties && feature.properties.owner) {
        const normalizedOwner = normalizeText(feature.properties.owner);
        feature.properties.normalized_owner =
          ownerMapping[normalizedOwner] || normalizedOwner;
      }
      return feature;
    });

    // Save the updated JSON
    fs.writeFile(
      outputFile,
      JSON.stringify(processedData),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing the output JSON file:", writeErr);
        } else {
          console.log("Final normalized owner data saved to", outputFile);
        }
      }
    );
  } catch (parseError) {
    console.error("Error parsing the JSON file:", parseError);
  }
});
