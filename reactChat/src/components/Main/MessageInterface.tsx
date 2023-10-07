import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { SendMessage } from "react-use-websocket";
import useCrud from "../../api/useCrud";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  useTheme,
} from "@mui/material";
import MessageInterfaceChannels from "./MessageInterfaceChannels";
import Scroll from "./Scroll";

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

interface SendMessageData {
  type: string;
  message: string;
  [key: string]: any;
}

interface Props {
  data: Server[];
}

const MessageInterface: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const [newMessage, setNewMessage] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const { serverId, channelId } = useParams();
  const { fetchData } = useCrud<Server>(
    [],
    `/messages/?channel_id=${channelId}`
  );

  const socketUrl = channelId
    ? `ws://127.0.0.1:8000/${serverId}/${channelId}`
    : null;

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: async () => {
      try {
        const data = await fetchData();
        setNewMessage([]);
        setNewMessage(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed");
    },
    onError: () => {
      console.log("!Error");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
      setMessage("");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendJsonMessage({
      type: "message",
      message,
    } as SendMessageData);
  };

  const formatTimeStamp = (timestamp: string): string => {
    const date = new Date(Date.parse(timestamp));
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    const formattedTime = date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendJsonMessage({
        type: "message",
        message,
      } as SendMessageData);
    }
  };

  return (
    <>
      <MessageInterfaceChannels data={data} />
      {channelId ? (
        <>
          <Box
            sx={{
              overflow: "hidden",
              p: 0,
              height: `calc(100vh - 100px)`,
            }}
          >
            <Scroll>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {newMessage.map((msg: Message, index: number) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="user image" />
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "12px",
                        variant: "body2",
                      }}
                      primary={
                        <>
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            sx={{ display: "inline", fontWeight: 600 }}
                          >
                            {msg.sender}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            color="textSecondary"
                            sx={{ display: "inline", fontW: 600 }}
                          >
                            {"  " + formatTimeStamp(msg.timestamp)}
                          </Typography>
                        </>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body1"
                            style={{
                              overflow: "visible",
                              whiteSpace: "normal",
                              textOverflow: "clip",
                            }}
                            sx={{
                              display: "inline",
                              lineHeight: 1.2,
                              fontW: 400,
                              letterSpacing: "-0.2px",
                            }}
                          >
                            {msg.content}
                          </Typography>
                        </React.Fragment>
                      }
                    ></ListItemText>
                  </ListItem>
                ))}
              </List>
            </Scroll>
          </Box>
          <Box sx={{ position: "sticky", bottom: 0, width: "100%" }}>
            <form
              style={{
                bottom: 0,
                right: 0,
                padding: "1rem",
                backgroundColor: theme.palette.background.default,
                zIndex: 1,
              }}
            >
              <Box sx={{ display: "flex" }}>
                <TextField
                  multiline
                  minRows={1}
                  maxRows={4}
                  value={message}
                  fullWidth
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </form>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            overflow: "hidden",
            p: { xs: 0 },
            height: `calc(80vh)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight={700}
              letterSpacing={"-0.5px"}
              sx={{ px: 5, maxWidth: "600px" }}
            >
              Welcome to {data?.[0]?.name ?? "Server"}
            </Typography>
            <Typography>
              {data?.[0]?.description
                ? data[0].description
                : "This is our home"}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MessageInterface;
