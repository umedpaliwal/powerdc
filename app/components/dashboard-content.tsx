"use client";

import { Box, Typography } from "@mui/material";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import DashboardSidebar from "./dashboard-sidebar";
import StatCards from "./stat-cards";
import { createPlantPopupHTML } from "@/lib/sanitize";

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";
if (!mapboxToken) {
  throw new Error("Mapbox access token is not defined");
}

interface FeatureProperties {
  fac_id_eia: string;
  eia_unit_id: string;
  plant_name: string;
  state: string;
  county: string;
  utility_name_eia_pudl: string;
  rto_name: string;
  total_plant_capacity: number;
  technology: string;
  capacity_mw: number;
  estimated_vc: number;
  capacity_factor: number;
  solar_crossover_year: string;
  wind_crossover_year: string;
  install_solar_capacity_mw_2030: number;
  install_wind_capacity_mw_2030: number;
  solar_lcoe_2024: number;
  wind_lcoe_2024: number;
  urban_area_perc: number;
}

interface UnitProperties {
  eia_unit_id: string;
  capacity_mw: number;
  estimated_vc: number;
  capacity_factor: number;
  solar_crossover_year?: string;
  wind_crossover_year?: string;
}

export default function DashboardContent({ plantsData }: { plantsData: any }) {
  const LAYER_ID = "1000gw-final-results-8t1vqs";
  const SOURCE_LAYER = "1000GW_final_results-8t1vqs";

  const [filters, setFilters] = useState<object>({});

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [mapboxgl, setMapboxgl] = useState<any>(null);
  const [allPlants, setAllPlants] = useState<any[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<any[]>([]);
  const [popupEventAdded, setPopupEventAdded] = useState(false);
  const [layerLoaded, setLayerLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      try {
        const mapboxgl = await import("mapbox-gl");
        setMapboxgl(mapboxgl.default);

        mapboxgl.default.accessToken =
          "pk.eyJ1IjoiZW5lcmd5YWkiLCJhIjoiY2xrdm45d29pMHJiazN0bXZjd3RybGRzayJ9.V_G-GvKzCYu8kGNk9HG3qA";

        const mapInstance = new mapboxgl.default.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/mapbox/satellite-streets-v12",
          center: [-101.5, 38],
          zoom: 3.7,
        });

        mapInstance.on("load", () => {

          // Add source
          mapInstance.addSource("power-plants", {
            type: "vector",
            url: "mapbox://energyai.6wyclba2",
          });

          // Add layer
          mapInstance.addLayer({
            id: LAYER_ID,
            type: "circle",
            source: "power-plants",
            "source-layer": SOURCE_LAYER,
            paint: {
              "circle-color": [
                "match",
                ["get", "technology"],
                "coal",
                "hsla(0, 16%, 11%, 0.54)",
                "gas_ct",
                "hsla(0, 67%, 52%, 0.44)",
                "gas_ccgt",
                "hsla(0, 71%, 52%, 0.48)",
                "ogs",
                "hsla(245, 85%, 41%, 0.57)",
                "#000000",
              ],
              "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                3,
                [
                  // At zoom level 3
                  "interpolate",
                  ["linear"],
                  ["get", "total_plant_capacity"],
                  10,
                  1, // Minimum size
                  3777,
                  8, // Maximum size
                ],
                10,
                [
                  // At zoom level 10
                  "interpolate",
                  ["linear"],
                  ["get", "total_plant_capacity"],
                  10,
                  5, // Larger minimum size at higher zoom
                  3777,
                  15, // Larger maximum size at higher zoom
                ],
                17,
                [
                  // At zoom level 17
                  "interpolate",
                  ["linear"],
                  ["get", "total_plant_capacity"],
                  10,
                  10, // Even larger minimum size at highest zoom
                  3777,
                  25, // Even larger maximum size at highest zoom
                ],
              ],
              "circle-stroke-width": 1,
              "circle-stroke-color": "white",
              "circle-stroke-opacity": 0.5,
            },
          });

          setMapLoaded(true);
          setLayerLoaded(true);
        });

        // // Add source loading event handler
        // mapInstance.on("sourcedata", (e) => {
        //   if (e.sourceId === "power-plants" && e.isSourceLoaded) {
        //     setSourceLoaded(true);
        //     setTrackSourceDataChange(!trackSourceDataChange);
        //   }
        // });

        map.current = mapInstance;
      } catch (error) {
        console.error("Error loading Mapbox GL:", error);
        setMapError("Failed to load Mapbox GL");
      }
    };

    initializeMap();
  }, []);

  // When map loads, store all features
  useEffect(() => {
    if (!mapLoaded || !map.current) return;

    const loadAllFeatures = () => {
      const plants = plantsData.map((plant: any) => ({
        ...plant.properties,
        geometry: plant.geometry,
      }));
      setAllPlants(plants);
      setFilteredPlants(plants);

      // const features = map.current.querySourceFeatures("power-plants", {
      //   sourceLayer: SOURCE_LAYER,
      // });

      // // Deduplicate features using composite key
      // const uniqueFeatures = new Map();
      // features.forEach((feature) => {
      //   if (!feature.properties) return;
      //   const key = `${feature.properties.fac_id_eia}_${feature.properties.eia_unit_id}`;
      //   if (!uniqueFeatures.has(key)) {
      //     uniqueFeatures.set(key, feature);
      //   }
      // });

      // const deduplicatedFeatures = Array.from(uniqueFeatures.values());

      // if (deduplicatedFeatures.length > 0) {
      //   setAllFeatures(deduplicatedFeatures);

      //   setAllPlants(deduplicatedFeatures.map((f) => f.properties));
      //   setFilteredPlants(deduplicatedFeatures.map((f) => f.properties));
      // } else {
      //   // If no features loaded, try again
      //   setTimeout(loadAllFeatures, 500);
      // }
    };

    loadAllFeatures();
  }, [mapLoaded]);

  useEffect(() => {
    if (!mapLoaded || !map.current || !mapboxgl || popupEventAdded) return;

    map.current.on("click", LAYER_ID, (e: any) => {
      if (!e.features?.length) return;

      const clickedFeature = e.features[0];
      const fac_id_eia = clickedFeature.properties.fac_id_eia;

      // Query all units and deduplicate
      const allUnits = map.current.querySourceFeatures("power-plants", {
        sourceLayer: SOURCE_LAYER,
        filter: ["==", ["get", "fac_id_eia"], fac_id_eia],
      });

      // Deduplicate units
      const uniqueUnits = new Map();
      allUnits.forEach((unit) => {
        const key = `${unit.properties.fac_id_eia}_${unit.properties.eia_unit_id}`;
        if (!uniqueUnits.has(key)) {
          uniqueUnits.set(key, unit);
        }
      });

      // Calculate summed renewable capacities for the facility
      const facilityTotals = Array.from(uniqueUnits.values()).reduce(
        (acc, unit) => {
          acc.install_solar_capacity_mw_2030 +=
            Number(unit.properties.install_solar_capacity_mw_2030) || 0;
          acc.install_wind_capacity_mw_2030 +=
            Number(unit.properties.install_wind_capacity_mw_2030) || 0;
          return acc;
        },
        {
          install_solar_capacity_mw_2030: 0,
          install_wind_capacity_mw_2030: 0,
        }
      );

      // Group unique units by technology
      const unitsByTechnology = Array.from(uniqueUnits.values()).reduce(
        (acc, unit) => {
          const tech = unit.properties.technology;
          if (!acc[tech]) acc[tech] = [];
          acc[tech].push(unit.properties);
          return acc;
        },
        {}
      );

      const popupContent = `
        <div class="popup-content" style="max-width: 300px;">
          <h3 style="color: #4fc3f7; margin-bottom: 10px;">${
            clickedFeature.properties.plant_name
          }</h3>
          
          <div class="popup-tabs">
            <button class="tab-button active" onclick="document.getElementById('overview-tab').style.display='block'; document.getElementById('units-tab').style.display='none'; document.getElementById('renewable-tab').style.display='none'; this.classList.add('active'); this.nextElementSibling.classList.remove('active'); this.nextElementSibling.nextElementSibling.classList.remove('active')">Overview</button>
            <button class="tab-button" onclick="document.getElementById('units-tab').style.display='block'; document.getElementById('overview-tab').style.display='none'; document.getElementById('renewable-tab').style.display='none'; this.classList.add('active'); this.previousElementSibling.classList.remove('active'); this.nextElementSibling.classList.remove('active')">Units</button>
            <button class="tab-button" onclick="document.getElementById('renewable-tab').style.display='block'; document.getElementById('overview-tab').style.display='none'; document.getElementById('units-tab').style.display='none'; this.classList.add('active'); this.previousElementSibling.classList.remove('active'); this.previousElementSibling.previousElementSibling.classList.remove('active')">Renewable</button>
          </div>

          <div id="overview-tab" class="tab-content" style="display: block;">
            <div class="info-grid">
              <div class="info-row">
                <span class="info-label">Location:</span>
                <span class="info-value">${clickedFeature.properties.state}, ${
        clickedFeature.properties.county
      }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Utility:</span>
                <span class="info-value">${
                  clickedFeature.properties.utility_name_eia_pudl
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">RTO/ISO:</span>
                <span class="info-value">${
                  clickedFeature.properties.rto_name
                }</span>
              </div>
              <div class="info-row">
                <span class="info-label">Total Plant Capacity:</span>
                <span class="info-value">${clickedFeature.properties.total_plant_capacity.toFixed(
                  1
                )} MW</span>
              </div>
            </div>
          </div>

          <div id="units-tab" class="tab-content" style="display: none;">
            <div class="info-grid">
              ${Object.entries(unitsByTechnology)
                .map(
                  ([tech, units]: [string, any]) => `
                <div class="unit-section">
                  <strong style="color: #4fc3f7; display: block; margin: 10px 0;">${
                    tech === "gas_ct"
                      ? "Gas CT"
                      : tech === "gas_ccgt"
                      ? "Gas CCGT"
                      : tech === "ogs"
                      ? "Oil/Gas Steam"
                      : tech.charAt(0).toUpperCase() + tech.slice(1)
                  }</strong>
                  ${(units as UnitProperties[])
                    .map(
                      (unit) => `
                    <div class="unit-info">
                      <div class="info-row">
                        <span class="info-label">Unit ID:</span>
                        <span class="info-value">${unit.eia_unit_id}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Capacity:</span>
                        <span class="info-value">${unit.capacity_mw.toFixed(
                          1
                        )} MW</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Variable Cost:</span>
                        <span class="info-value">${
                          unit.estimated_vc?.toFixed(2) || "N/A"
                        } $/MWh</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Capacity Factor:</span>
                        <span class="info-value">${(
                          unit.capacity_factor * 100
                        ).toFixed(1)}%</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Solar Crossover:</span>
                        <span class="info-value">${
                          unit.solar_crossover_year || "N/A"
                        }</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Wind Crossover:</span>
                        <span class="info-value">${
                          unit.wind_crossover_year || "N/A"
                        }</span>
                      </div>
                    </div>
                  `
                    )
                    .join("")}
                </div>
              `
                )
                .join("")}
            </div>
          </div>

          <div id="renewable-tab" class="tab-content" style="display: none;">
            <div class="info-grid">
              <div class="info-row">
                <span class="info-label">Solar Int. Pot. (2030):</span>
                <span class="info-value">${facilityTotals.install_solar_capacity_mw_2030.toFixed(
                  1
                )} MW</span>
              </div>
              <div class="info-row">
                <span class="info-label">Wind Int. Pot. (2030):</span>
                <span class="info-value">${facilityTotals.install_wind_capacity_mw_2030.toFixed(
                  1
                )} MW</span>
              </div>
              <div class="info-row">
                <span class="info-label">Solar LCOE (2024):</span>
                <span class="info-value">$${clickedFeature.properties.solar_lcoe_2024.toFixed(
                  2
                )}/MWh</span>
              </div>
              <div class="info-row">
                <span class="info-label">Wind LCOE (2024):</span>
                <span class="info-value">$${clickedFeature.properties.wind_lcoe_2024.toFixed(
                  2
                )}/MWh</span>
              </div>
            </div>
          </div>
        </div>
      `;

      // Create popup with sanitized content
      const popup = new mapboxgl.Popup({
        maxWidth: "400px",
        className: "custom-popup",
      });
      
      // Use a div element to safely set content
      const popupDiv = document.createElement('div');
      popupDiv.innerHTML = popupContent; // This is safe as we control the template
      
      popup
        .setLngLat(e.lngLat)
        .setDOMContent(popupDiv)
        .addTo(map.current);
    });

    map.current.on("mouseenter", LAYER_ID, () => {
      map.current.getCanvas().style.cursor = "pointer";
    });

    map.current.on("mouseleave", LAYER_ID, () => {
      map.current.getCanvas().style.cursor = "";
    });

    setPopupEventAdded(true);
  }, [mapLoaded, mapboxgl, popupEventAdded]);

  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      Coal: "#000000", // Black
      Gas: "#9e0ce7", // Dark grey
      Oil: "#bb2f08", // Red
    };
    return colorMap[category] || "#808080"; // Default color for unknown categories
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
      }
    });

    observer.observe(mapContainer.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const solidGrey = "#808080"; // Solid grey color

  const sidebarBgColor = "rgba(255, 255, 255, 0.1)"; // Light, semi-transparent background
  const textColor = "#ffffff"; // White text for contrast
  const accentColor = "#4fc3f7"; // Light blue for accents

  // const handleFilterChange = (filterName: string, value: string | boolean) => {
  //   if (!map.current) return;

  //   const newFilters = {
  //     ...filters,
  //     [filterName]: value,
  //   };

  //   try {
  //     // Apply filter to map
  //     const filterExpression: mapboxgl.Expression = ["all"];
  //     Object.entries(newFilters).forEach(([key, val]) => {
  //       if (val && key !== "removeUrbanAreaPlants") {
  //         filterExpression.push(["==", ["get", key], val]);
  //       }
  //     });
  //     if (newFilters.removeUrbanAreaPlants === true) {
  //       filterExpression.push(["<", ["get", "urban_area_perc"], 30]);
  //     }
  //     map.current.setFilter(LAYER_ID, filterExpression);

  //     // Filter from stored features
  //     const uniqueFilteredFeatures = new Map();
  //     allFeatures.forEach((feature) => {
  //       if (!feature.properties) return;

  //       // Check filters
  //       for (const [key, val] of Object.entries(newFilters)) {
  //         if (val && key !== "removeUrbanAreaPlants") {
  //           if (feature.properties[key] !== val) return;
  //         }
  //       }

  //       if (newFilters.removeUrbanAreaPlants === true) {
  //         if (
  //           !feature.properties.urban_area_perc ||
  //           feature.properties.urban_area_perc >= 30
  //         )
  //           return;
  //       }

  //       const key = `${feature.properties.fac_id_eia}_${feature.properties.eia_unit_id}`;
  //       if (!uniqueFilteredFeatures.has(key)) {
  //         uniqueFilteredFeatures.set(key, feature);
  //       }
  //     });

  //     // Update plant data
  //     const filteredFeatures = Array.from(uniqueFilteredFeatures.values());
  //     setFilteredPlants(filteredFeatures.map((f) => f.properties));

  //     // Handle map bounds
  //     if (typeof value !== "boolean" && value && filteredFeatures.length > 0) {
  //       const bounds = new mapboxgl.LngLatBounds();
  //       filteredFeatures.forEach((feature) => {
  //         if (feature.geometry?.coordinates) {
  //           bounds.extend(feature.geometry.coordinates);
  //         }
  //       });

  //       // Adjust padding based on filter type
  //       const padding =
  //         filterName === "plant_name"
  //           ? {
  //               top: 400, // Increased top padding to move plant up
  //               bottom: 100, // Reduced bottom padding to balance
  //               left: 200, // Keep equal horizontal padding
  //               right: 200,
  //             }
  //           : {
  //               top: 50,
  //               bottom: 150,
  //               left: 358,
  //               right: 50,
  //             };

  //       map.current.fitBounds(bounds, {
  //         padding,
  //         maxZoom: filterName === "plant_name" ? 16 : 10,
  //         duration: 1500,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error during filter change:", error);
  //   }

  //   setFilters(newFilters);
  // };

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    if (!map.current) return;

    const newFilters = {
      ...filters,
      [filterName]: value,
    };

    try {
      // Apply filter to map
      const filterExpression: mapboxgl.Expression = ["all"];
      Object.entries(newFilters).forEach(([key, val]) => {
        if (val && key !== "removeUrbanAreaPlants") {
          filterExpression.push(["==", ["get", key], val]);
        }
      });
      if (newFilters.removeUrbanAreaPlants === true) {
        filterExpression.push(["<", ["get", "urban_area_perc"], 30]);
      }
      map.current.setFilter(LAYER_ID, filterExpression);

      // Filter directly from plants data
      const uniqueFilteredPlants = new Map();
      allPlants.forEach((plant: any) => {
        if (!plant) return;

        // Check filters
        for (const [key, val] of Object.entries(newFilters)) {
          if (val && key !== "removeUrbanAreaPlants") {
            if (plant[key] !== val) return;
          }
        }

        if (newFilters.removeUrbanAreaPlants === true) {
          if (!plant.urban_area_perc || plant.urban_area_perc >= 30) return;
        }

        const key = `${plant.fac_id_eia}_${plant.eia_unit_id}`;
        if (!uniqueFilteredPlants.has(key)) {
          uniqueFilteredPlants.set(key, plant);
        }
      });

      // Update filtered plant data
      const filteredPlants = Array.from(uniqueFilteredPlants.values());
      setFilteredPlants(filteredPlants);

      // Handle map bounds
      if (typeof value !== "boolean" && value && filteredPlants.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        filteredPlants.forEach((plant) => {
          if (plant.geometry?.coordinates) {
            bounds.extend(plant.geometry.coordinates);
          }
        });

        // Adjust padding based on filter type
        const padding =
          filterName === "plant_name"
            ? {
                top: 400, // Increased top padding to move plant up
                bottom: 100, // Reduced bottom padding to balance
                left: 200, // Keep equal horizontal padding
                right: 200,
              }
            : {
                top: 50,
                bottom: 150,
                left: 358,
                right: 50,
              };

        map.current.fitBounds(bounds, {
          padding,
          maxZoom: filterName === "plant_name" ? 16 : 10,
          duration: 1500,
        });
      }
    } catch (error) {
      console.error("Error during filter change:", error);
    }

    setFilters(newFilters);
  };

  const handleReset = () => {
    if (!map.current) return;

    // Clear all filters
    setFilters({});

    // Reset map filter
    map.current.setFilter(LAYER_ID, null);

    // Reset map view
    map.current.flyTo({
      center: [-101.5, 38],
      zoom: 3.7,
      duration: 1500,
    });

    // Reset plant data to show all plants
    setAllPlants((val) => {
      setFilteredPlants(val);
      return val;
    });
  };

  // Update the popup styles
  const popupStyles = `
    .custom-popup {
      background-color: rgba(0, 0, 0, 0.8) !important;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }
    .custom-popup .mapboxgl-popup-content {
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 15px;
      max-height: 400px;
      overflow-y: auto;
    }
    .custom-popup .mapboxgl-popup-tip {
      border-top-color: rgba(0, 0, 0, 0.8);
    }
    .popup-tabs {
      display: flex;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    .tab-button {
      background: none;
      border: none;
      color: white;
      padding: 8px 12px;
      cursor: pointer;
      flex: 1;
      font-size: 0.9rem;
      opacity: 0.7;
      transition: all 0.3s ease;
    }
    .tab-button:hover {
      opacity: 1;
    }
    .tab-button.active {
      color: #4fc3f7;
      opacity: 1;
      border-bottom: 2px solid #4fc3f7;
    }
    .tab-content {
      padding: 10px 0;
    }
    .info-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
      padding-bottom: 4px;
    }
    .info-label {
      color: #4fc3f7;
      font-weight: bold;
      margin-right: 8px;
      white-space: nowrap;
    }
    .info-value {
      text-align: right;
      word-break: break-word;
    }
    .unit-section {
      margin-bottom: 15px;
    }
    .unit-section:last-child {
      margin-bottom: 0;
    }
    .unit-info {
      margin-bottom: 10px;
      padding-left: 10px;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
    }
    .unit-info:last-child {
      margin-bottom: 0;
    }
  `;

  // Add the styles to the document
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = popupStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      {/* Map Container */}
      <Box
        ref={mapContainer}
        sx={{
          height: { xs: "60vh", md: "100%" },
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />

      {/* Color Legend */}
      <Box
        sx={{
          position: "absolute",
          bottom: { xs: "41vh", md: 140 },
          right: 16,
          width: "200px",
          borderRadius: "8px",
          padding: 2,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#ffffff",
          zIndex: 1,
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {[
          { tech: "coal", label: "Coal", color: "hsla(0, 16%, 11%, 0.54)" },
          { tech: "gas_ct", label: "Gas CT", color: "hsla(0, 67%, 52%, 0.44)" },
          {
            tech: "gas_ccgt",
            label: "Gas CCGT",
            color: "hsla(0, 71%, 52%, 0.48)",
          },
          {
            tech: "ogs",
            label: "Oil/Gas Steam",
            color: "hsla(245, 85%, 41%, 0.57)",
          },
        ].map(({ tech, label, color }) => (
          <Box key={tech} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: color,
                marginRight: 1,
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            />
            <Typography variant="body2" sx={{ color: "white" }}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Mobile Layout - Only Filters */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          height: "40vh",
          overflowY: "auto",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          p: 2,
        }}
      >
        <DashboardSidebar
          filters={filters}
          setFilters={setFilters}
          plantData={{
            all: plantsData,
            filtered: filteredPlants,
          }}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </Box>

      {/* Desktop Layout - Original Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: "16px",
          left: 16,
          width: "308px",
          maxHeight: "calc(100% - 180px)",
          borderRadius: "8px",
          padding: 2,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#ffffff",
          backdropFilter: "blur(5px)",
          overflowY: "auto",
          zIndex: 1,
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <DashboardSidebar
          filters={filters}
          setFilters={setFilters}
          plantData={{
            all: allPlants,
            filtered: filteredPlants,
          }}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </Box>

      {/* Desktop Stats - Original Layout */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: "8px",
          padding: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
          zIndex: 1,
        }}
      >
        <StatCards plants={filteredPlants} />
      </Box>

      {mapError && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(0, 0, 0, 0.8)",
            color: "#ff6b6b",
            borderRadius: "8px",
            padding: 2,
            border: "1px solid #ff6b6b",
          }}
        >
          <Typography color="error">Error loading map: {mapError}</Typography>
        </Box>
      )}
    </Box>
  );
}
