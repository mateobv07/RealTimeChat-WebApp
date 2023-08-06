import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Box } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  toggleDrawer: () => void;
};

const DrawerToggle: React.FC<Props> = ({ open, toggleDrawer }) => {
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={toggleDrawer}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

export default DrawerToggle;
