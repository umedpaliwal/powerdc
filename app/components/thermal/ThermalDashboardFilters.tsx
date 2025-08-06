"use client";

import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Button,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

interface ThermalDashoardFiltersProps {
  filters: any;
  setFilters: (filters: any) => void;
  plantData: { all: any[]; filtered: any[] };
  onFilterChange: (filterName: string, value: string | boolean) => void;
  onReset: () => void;
}

export default function ThermalDashoardFilters({
  filters,
  setFilters,
  plantData,
  onFilterChange,
  onReset,
}: ThermalDashoardFiltersProps) {
  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    onFilterChange(name, newValue);
  };

  const getUniqueValues = (field: string) => {
    if (!plantData?.all || !plantData.all.length) return [];

    // Start with all plants
    let filteredPlants = plantData.all;

    // Apply cascading filters
    if (filters.rto_name && field !== "rto_name") {
      filteredPlants = filteredPlants.filter(
        (plant) => plant.rto_name === filters.rto_name
      );
    }

    if (filters.state && field !== "rto_name" && field !== "state") {
      filteredPlants = filteredPlants.filter(
        (plant) => plant.state === filters.state
      );
    }

    if (
      filters.parent_company_name &&
      field !== "rto_name" &&
      field !== "state" &&
      field !== "parent_company_name"
    ) {
      filteredPlants = filteredPlants.filter(
        (plant) => plant.parent_company_name === filters.parent_company_name
      );
    }

    // Get unique values from filtered plants
    return [
      ...new Set(filteredPlants.map((plant) => plant[field]).filter(Boolean)),
    ].sort();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<RestartAltIcon />}
        onClick={onReset}
        fullWidth
        sx={{
          mb: 2,
          color: "white",
          borderColor: "rgba(255, 255, 255, 0.3)",
          "&:hover": {
            borderColor: "white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        Reset Filters
      </Button>

      <TextField
        select
        label="RTO/ISO"
        name="rto_name"
        value={filters.rto_name || ""}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
        variant="outlined"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      >
        <option value="">Select RTO/ISO</option>
        {getUniqueValues("rto_name").map((rto) => (
          <option key={rto} value={rto}>
            {rto}
          </option>
        ))}
      </TextField>

      <TextField
        select
        label="State"
        name="state"
        value={filters.state || ""}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
        variant="outlined"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      >
        <option value="">Select State</option>
        {getUniqueValues("state").map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </TextField>

      <TextField
        select
        label="Parent Company"
        name="parent_company_name"
        value={filters.parent_company_name || ""}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
        variant="outlined"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      >
        <option value="">Select Parent Company</option>
        {getUniqueValues("parent_company_name").map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </TextField>

      <TextField
        select
        label="Plant Name"
        name="plant_name"
        value={filters.plant_name || ""}
        onChange={handleFilterChange}
        fullWidth
        margin="normal"
        variant="outlined"
        SelectProps={{
          native: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      >
        <option value="">Select Plant</option>
        {getUniqueValues("plant_name").map((plant) => (
          <option key={plant} value={plant}>
            {plant}
          </option>
        ))}
      </TextField>

      <FormControlLabel
        control={
          <Checkbox
            checked={filters.removeUrbanAreaPlants || false}
            onChange={handleFilterChange}
            name="removeUrbanAreaPlants"
          />
        }
        label="Remove Urban Area Plants"
      />
    </Box>
  );
}
