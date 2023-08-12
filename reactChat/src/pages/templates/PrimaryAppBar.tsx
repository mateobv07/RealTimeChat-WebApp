import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Link,
  Typography,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import ExploreCategories from "../../components/SecondaryDraw/ExploreCategories";

const PrimaryAppBar = () => {
  const [sideMenu, setSideMenu] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen]);

  return (
    <AppBar
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          height: theme.primaryAppBar.height,
          minHeight: theme.primaryAppBar.height,
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 1 }}
            onClick={() => setSideMenu(!sideMenu)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={sideMenu}
          onClose={() => setSideMenu(false)}
        >
          <Box
            sx={{
              paddingTop: `${theme.primaryAppBar.height}px`,
              minWidth: 200,
            }}
            role="presentation"
            onClick={() => setSideMenu(false)}
            onKeyDown={() => setSideMenu(false)}
          >
            <ExploreCategories />
          </Box>
        </Drawer>

        <Link href="/" underline="none" color="inherit">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { fontWeight: 700, letterSpacing: "-0.3px" } }}
          >
            SUPERCHAT
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default PrimaryAppBar;
