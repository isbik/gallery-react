import TextField from "@mui/material/TextField";
import * as React from "react";
import VirtualSelect from "./VirtualSelect";

const AlbumSelect = (props) => {
  return (
    <VirtualSelect
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Album id" />}
      renderOption={(props, option) => [props, option]}
      renderGroup={(params) => params}
      {...props}
    />
  );
};

export default AlbumSelect;
