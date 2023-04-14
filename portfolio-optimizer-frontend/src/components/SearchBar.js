import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SearchBar = ({ stocks, handleStocksChange }) => {
  return (
    <Autocomplete
      multiple
      options={stocks}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label="Stocks" placeholder="Select stocks" />
      )}
      onChange={(_, value) => handleStocksChange(value)}
    />
  );
};

export default SearchBar;
