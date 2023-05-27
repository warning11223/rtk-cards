import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  value: string
  setValue: (value: string) => void
}

export const ModalSelect: React.FC<Props> = ({ setValue, value }) => {

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color={"warning"}>Choose image or text:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Choose image or text:"
          onChange={handleChange}
          size={"medium"}
          color={"warning"}
          variant={"outlined"}

        >
          <MenuItem value={"image"}>Image</MenuItem>
          <MenuItem value={"text"}>Text</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
