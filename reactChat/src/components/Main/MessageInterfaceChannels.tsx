import {
  AppBar,
  Toolbar,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { MEDIA_URL } from "../../config";
import { useParams } from "react-router-dom";
import ServerChannels from "../SecondaryDraw/ServerChannels";
import { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}
interface Server {
  id: number;
  name: string;
  category: string;
  description: string;
  icon: string;
  channel_server: {
    id: number;
    name: string;
    server: number;
    topic: string;
    owner: number;
  }[];
}

interface Props {
  data: Server[];
}

const MessageInterfaceChannels: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const { serverId, channelId } = useParams();
  const [sideMenu, setSideMenu] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const channelName =
    data
      ?.find((server) => server.id === Number(serverId))
      ?.channel_server?.find((channel) => channel.id === Number(channelId))
      ?.name || "home";

  useEffect(() => {
    if (isSmallScreen && sideMenu) {
      setSideMenu(false);
    }
  }, [isSmallScreen]);

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        color="default"
        position="sticky"
        elevation={0}
      >
        <Toolbar
          variant="dense"
          sx={{
            minHeight: theme.primaryAppBar.height,
            height: theme.primaryAppBar.height,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar
                alt="Server Icon"
                src={`${MEDIA_URL}${data?.[0]?.icon}`}
                sx={{ width: 30, height: 30 }}
              />
            </ListItemAvatar>
          </Box>
          <Typography noWrap component="div">
            {channelName}
          </Typography>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setSideMenu(true)}
            >
              <MoreVertIcon />
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
              <ServerChannels data={data} />
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MessageInterfaceChannels;
