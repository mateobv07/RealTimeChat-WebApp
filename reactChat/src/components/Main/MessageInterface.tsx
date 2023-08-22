import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import useCrud from "../../api/useCrud";
import { Box, Typography } from "@mui/material";

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

const MessageInterface: React.FC<Props> = ({ data }) => {
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
    },
  });

  return (
    <>
      {channelId ? (
        <div>
          {newMessage.map((msg: Message, index: number) => (
            <div key={index}>
              <p>{msg.sender}</p>
              <p>{msg.content}</p>
            </div>
          ))}
          <form>
            <label>
              Enter Message:
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </form>
          <button
            onClick={() => {
              sendJsonMessage({ type: "message", message });
            }}
          >
            Send Message
          </button>
        </div>
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
            {" "}
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
