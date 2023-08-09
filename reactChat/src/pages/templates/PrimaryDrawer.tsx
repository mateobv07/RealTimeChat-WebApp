import { useTheme } from "@mui/material/styles";
import { Box, Typography, useMediaQuery, styled } from "@mui/material";
import React, { useState, useEffect, ReactNode } from "react";
import DrawerToggle from "../../components/PrimaryDrawer/DrawerToggle";
import MuiDrawer from "@mui/material/Drawer";

type Props = {
  children: ReactNode;
};

type ChildProps = {
  open: boolean;
};

type ChildElement = React.ReactElement<ChildProps>;

const PrimaryDrawer: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const below600 = useMediaQuery("(max-width:599px)");
  const [open, setOpen] = useState(!below600);

  const openedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = () => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: theme.primaryDrawer.closedWidth,
  });

  const Drawer = styled(
    MuiDrawer,
    {}
  )(({ theme, open }) => ({
    width: theme.primaryDrawer.width,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(),
      "& .MuiDrawer-paper": openedMixin(),
    }),
    ...(!open && {
      ...closedMixin(),
      "& .MuiDrawer-paper": closedMixin(),
    }),
  }));

  useEffect(() => {
    setOpen(!below600);
  }, [below600]);

  const toggleDrawer = () => {
    setOpen((current) => !current);
  };

  return (
    <Drawer
      open={open}
      variant={below600 ? "temporary" : "permanent"}
      PaperProps={{
        sx: {
          mt: `${theme.primaryAppBar.height}px`,
          height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
          width: theme.primaryDrawer.width,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 0,
            width: open ? "auto" : "100%",
          }}
        >
          <DrawerToggle open={open} toggleDrawer={toggleDrawer} />
        </Box>
        {React.Children.map(children, (child) => {
          return React.isValidElement(child)
            ? React.cloneElement(child as ChildElement, { open })
            : child;
        })}
      </Box>
    </Drawer>
  );
};

export default PrimaryDrawer;
