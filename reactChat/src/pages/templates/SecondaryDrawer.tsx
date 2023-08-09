import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

type SecondaryDrawerProps = {
  children: React.ReactNode;
};

const SecondaryDrawer = ({ children }): SecondaryDrawerProps => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: `${theme.secondaryDrawer.width}px`,
        mt: `${theme.primaryAppBar.height}px`,
        height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: { xs: "none", sm: "block" },
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default SecondaryDrawer;
