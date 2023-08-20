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
import { useEffect } from "react";
import { MEDIA_URL } from "../../config";
import { Link, useParams } from "react-router-dom";

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
  channel_server: {
    id: number;
    name: string;
    server: number;
    topic: string;
    owner: number;
  }[];
}

interface ServerChannelsProps {
  data: Server[];
}

const ServerChannels = (props: ServerChannelsProps) => {
  const { data } = props;
  const theme = useTheme();
  const { serverId } = useParams();

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
        <Typography
          variant="body1"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {data?.[0]?.name ? data[0].name : "Server"}
        </Typography>
      </Box>
      <List sx={{ py: 0 }}>
        {data?.[0]?.channel_server.map((obj) => (
          <ListItem
            disablePadding
            key={obj.id}
            dense={true}
            sx={{ display: "block", maxHeight: "40px" }}
          >
            <Link
              to={`/server/${serverId}/${obj.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton sx={{ minHeight: 48 }}>
                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      textAlign="start"
                      paddingLeft={1}
                    >
                      {obj.name}
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
