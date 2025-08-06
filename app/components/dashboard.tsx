"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/system";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as d3 from "d3";
import { Plant } from "@/app/types/plant";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

const DashboardContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100vh",
}));

const Sidebar = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: "100%",
}));

interface DashboardProps {
  initialPlants: Plant[];
  initialFilters: {
    [key: string]: boolean;
  };
}

export default function Dashboard({
  initialPlants,
  initialFilters,
}: DashboardProps) {
  const [plants, setPlants] = useState<Plant[]>(initialPlants);
  const [filters, setFilters] = useState(initialFilters);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    d3.csv("/US_1000GW_Dashboard.csv").then((data) => {
      setPlants(data as Plant[]);
    });
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-98.5795, 39.8283],
      zoom: 3,
    });

    map.current.on("load", () => {
      addMarkers();
    });
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const totalCapacity = filteredPlants.reduce(
    (sum, plant) =>
      sum + parseFloat(plant["Nameplate_Capacity_(MW)_g_x"] || "0"),
    0
  );
  const averageCapacity = totalCapacity / filteredPlants.length || 0;

  useEffect(() => {
    const filteredPlants = plants.filter((plant) => {
      return plant.Category ? filters[plant.Category] : true;
    });
    setFilteredPlants(filteredPlants);
  }, [filters, setFilteredPlants]);

  const addMarkers = () => {
    if (!map.current) return;

    filteredPlants.forEach((plant) => {
      if (plant.longitude && plant.latitude) {
        const el = document.createElement("div");
        el.className = "marker";

        const capacity = parseFloat(plant["Nameplate_Capacity_(MW)_g_x"]);
        const size = Math.max(5, Math.min(20, 5 + capacity / 100));

        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.backgroundColor = getCategoryColor(plant.Category);
        el.style.borderRadius = "50%";

        const marker = new mapboxgl.Marker(el)
          .setLngLat([Number(plant.longitude), Number(plant.latitude)])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <strong>${plant.fac_name}</strong><br>
                Category: ${plant.Category}<br>
                Capacity: ${parseFloat(
                  plant["Nameplate_Capacity_(MW)_g_x"]
                ).toFixed(2)} MW
              `)
          );

        if (map.current) {
          marker.addTo(map.current);
        }
      }
    });
  };

  useEffect(() => {
    if (map.current) {
      addMarkers();
    }
  }, [filteredPlants]);

  return (
    <DashboardContainer>
      <Sidebar variant="permanent" anchor="left">
        <List>
          <ListItem>
            <ListItemText primary="Filters" />
          </ListItem>
          <ListItem>
            <FormGroup>
              {Object.keys(filters).map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={filters[category]}
                      onChange={handleFilterChange}
                      name={category}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </ListItem>
        </List>
      </Sidebar>
      <MainContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StatsCard>
              <CardContent>
                <Typography variant="h6">Total Plants</Typography>
                <Typography variant="h4">{filteredPlants.length}</Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatsCard>
              <CardContent>
                <Typography variant="h6">Total Capacity (MW)</Typography>
                <Typography variant="h4">{totalCapacity.toFixed(2)}</Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatsCard>
              <CardContent>
                <Typography variant="h6">Average Capacity (MW)</Typography>
                <Typography variant="h4">
                  {averageCapacity.toFixed(2)}
                </Typography>
              </CardContent>
            </StatsCard>
          </Grid>
          <Grid item xs={12}>
            <Box ref={mapContainer} sx={{ height: "60vh", width: "100%" }} />
          </Grid>
        </Grid>
      </MainContent>
    </DashboardContainer>
  );
}
function getCategoryColor(category: string) {
  const colorMap: { [key: string]: string } = {
    Coal: "#8B4513",
    "Natural Gas": "#FFA500",
    Nuclear: "#800080",
    Oil: "#000000",
    Hydro: "#0000FF",
    Solar: "#FFD700",
    Wind: "#00FF00",
  };
  return colorMap[category] || "#808080";
}
