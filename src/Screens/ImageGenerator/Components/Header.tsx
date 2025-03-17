import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AI Image Generator
        </Typography>
        <Typography variant="subtitle2">
          Turn your ideas into visuals
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
