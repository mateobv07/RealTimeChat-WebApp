import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import useCrud from "../../api/useCrud";
import { useEffect } from "react";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MEDIA_URL } from "../../config";
import { useParams, Link } from "react-router-dom";

interface Server {
  id: number;
  name: string;
  description: string;
  icon: string;
  banner: string;
  category: string;
}

const ExploreServers = () => {
  const { categoryName } = useParams();
  const url = categoryName ? `/server/?category=${categoryName}` : "/server/";
  const { data, fetchData } = useCrud<Server>([], url);

  useEffect(() => {
    fetchData();
  }, [categoryName]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 6 }}>
        <Typography
          variant="h3"
          noWrap
          component="h1"
          sx={{
            display: {
              sm: "block",
              fontWeight: 700,
              letterSpacing: "-1.5px",
              textTransform: "capitalize",
            },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {categoryName ? categoryName : "Popular Channels"}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h6"
          noWrap
          component="h2"
          color="textSecondary"
          sx={{
            display: {
              sm: "block",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {categoryName
            ? `Channels talking about ${categoryName}`
            : "Check out some of our popular channels"}
        </Typography>
      </Box>
      <Typography
        variant="h6"
        sx={{ pt: 6, pb: 1, fontWeight: 700, letterSpacing: "-1px" }}
      >
        Recommended Channels
      </Typography>
      <Grid container spacing={{ xs: 0, sm: 2 }}>
        {data.map((server) => (
          <Grid item key={server.id} xs={12} sm={12} md={6} lg={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
                backgroundImage: "none",
                borderRadius: 0,
              }}
            >
              <Link
                to={`/server/${server.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  image={
                    server.banner
                      ? `${MEDIA_URL}${server.banner}`
                      : "https://source.unsplash.com/ranom/"
                  }
                  alt="server image"
                  component="img"
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: 0,
                    "&:last-child": { paddingBottom: 0 },
                  }}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: 0 }}>
                        <ListItemAvatar sx={{ minWidth: "50px" }}>
                          <Avatar
                            alt="serverIcon"
                            src={`${MEDIA_URL}${server.icon}`}
                          />
                        </ListItemAvatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            textAlign="start"
                            sx={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              fontWeight: 700,
                            }}
                          >
                            {server.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body2">
                            {server.category}
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExploreServers;
