import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall({ handleChange, value, languages, label }) {
  return (
    <FormControl
      sx={{
        minWidth: 120,
        color: "white",
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: 'white',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(228, 219, 233, 0.25)',
        },
      }}
      size="small"
      style={{ color: "white" }}
    >
      <InputLabel id="demo-select-small" style={{ color: "white", border: "white" }}>{label}</InputLabel>
      <Select
        style={{ color: "white", height: "32px" }}
        labelId="demo-select-small"
        id="demo-select-small"
        value={value}
        label="Age"
        onChange={(e) => handleChange(e.target.value)}
      >
        {
          languages.map((l) =>
          (
            <MenuItem value={l.data}>{l.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}