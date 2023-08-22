import { Box, CssBaseline } from "@mui/material";
import PrimaryAppBar from "./templates/PrimaryAppBar";
import PrimaryDrawer from "./templates/PrimaryDrawer";
import SecondaryDrawer from "./templates/SecondaryDrawer";
import Main from "./templates/Main";
import PopularChannels from "../components/PrimaryDrawer/PopularChannels";
import MessageInterface from "../components/Main/MessageInterface";
import ServerChannels from "../components/SecondaryDraw/ServerChannels";
import UserServers from "../components/PrimaryDrawer/UserServers";
import { useNavigate, useParams } from "react-router-dom";
import useCrud from "../api/useCrud";
import { useEffect } from "react";

interface Server {
  id: number;
  name: string;
  category: string;
  icon: string;
  description: string;
  channel_server: {
    id: number;
    name: string;
    server: number;
    topic: string;
    owner: number;
  }[];
}

const Server = () => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const { data, error, isLoading, fetchData } = useCrud<Server>(
    [],
    `/server/?by_server_id=${serverId}`
  );

  if (error !== null && error.message === "400") {
    navigate("/");
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Check if channelID is valid by searching for it in fetched data.
  const isChannel = (): Boolean => {
    if (!channelId) {
      return true;
    }

    return data.some((server) =>
      server.channel_server.some(
        (channel) => channel.id === parseInt(channelId)
      )
    );
  };

  useEffect(() => {
    if (!isChannel()) {
      navigate(`/server/${serverId}`);
    }
  }, [isChannel, channelId]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PrimaryAppBar />
      <PrimaryDrawer>
        <UserServers open={false} data={data} />
      </PrimaryDrawer>
      <SecondaryDrawer>
        <ServerChannels data={data} />
      </SecondaryDrawer>
      <Main>
        <MessageInterface data={data} />
      </Main>
    </Box>
  );
};
export default Server;
