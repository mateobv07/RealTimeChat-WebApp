import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useCrud from "../../api/useCrud";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const ServerChannels = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { data, error, isLoading, fetchData } = useCrud<Category>(
    [],
    "/server/category/"
  );

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
        }}
      >
        Explore
      </Box>
      <List sx={{ py: 0 }}>
        {data.map((category) => (
          <ListItem
            disablePadding
            key={category.id}
            dense={true}
            sx={{ display: "block" }}
          >
            <Link
              to={`/explore/${category.name}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  <ListItemAvatar sx={{ minWidth: "0px" }}>
                    <img
                      alt="server Icon"
                      src={`${MEDIA_URL}${category.icon}`}
                      style={{
                        width: "25px",
                        height: "25px",
                        filter: isDarkMode ? "invert(100%)" : "none",
                        display: "block",
                        margin: "auto",
                      }}
                    />
                  </ListItemAvatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      textAlign="start"
                      paddingLeft={1}
                    >
                      {category.name}
                    </Typography>
                  }
                ></ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ServerChannels;
