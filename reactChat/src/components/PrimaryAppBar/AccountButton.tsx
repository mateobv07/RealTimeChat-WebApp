import { AccountCircle } from "@mui/icons-material";
import { IconButton, Box, Menu, MenuItem } from "@mui/material";
import DarkModeSwitch from "./DarkModeSwitch";
import { useState } from "react";

const AccountButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      open={isMenuOpen}
      anchorEl={anchorEl}
      keepMounted
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <MenuItem>
        <DarkModeSwitch />
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: { xs: "flex" } }}>
      <IconButton edge="end" color="inherit" onClick={handleProfileMenuOpen}>
        <AccountCircle />
      </IconButton>
      {renderMenu}
    </Box>
  );
};

export default AccountButton;
