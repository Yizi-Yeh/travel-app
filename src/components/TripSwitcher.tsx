"use client";

import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function TripSwitcher() {
  const [value, setValue] = useState("demo");

  return (
    <FormControl size="small" sx={{ minWidth: 160 }}>
      <InputLabel id="trip-switcher">Trip</InputLabel>
      <Select
        labelId="trip-switcher"
        label="Trip"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <MenuItem value="demo">Demo Trip</MenuItem>
      </Select>
    </FormControl>
  );
}
