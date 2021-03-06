const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "nusocial5",
  api_key: "829672847473966",
  api_secret: "EmSoixOPZ2b8u7Ot6xc1YR1oJmk",
});

const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// middleware
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://nusocial5.herokuapp.com",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.chatId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(8000, () => {
  console.log("SERVER RUNNING");
});

// routers
const router = require("./routes/studentRouter.js");
app.use("/api/students", router);
const friendsRouter = require("./routes/friendsRouter.js");
app.use("/api/friends", friendsRouter);
const postsRouter = require("./routes/postsRouter.js");
app.use("/api/posts", postsRouter);
const commentsRouter = require("./routes/commentsRouter.js");
app.use("/api/comments", commentsRouter);
const groupNamesRouter = require("./routes/groupNamesRouter.js");
app.use("/api/groupnames", groupNamesRouter);
const groupMembershipsRouter = require("./routes/groupMembershipsRouter.js");
app.use("/api/groupmemberships", groupMembershipsRouter);
const personalChatsRouter = require("./routes/personalChatsRouter.js");
app.use("/api/personalchats", personalChatsRouter);
const linksRouter = require("./routes/linksRouter.js");
app.use("/api/links", linksRouter);
const testsAndDeadlinesRouter = require("./routes/testsAndDeadlinesRouter.js");
app.use("/api/testsanddeadlines", testsAndDeadlinesRouter);
const trendingTagsRouter = require("./routes/trendingTagsRouter.js");
app.use("/api/trendingtags", trendingTagsRouter);
const trendingRouter = require("./routes/trendingRouter.js");
app.use("/api/trending", trendingRouter);
const recentEventsRouter = require("./routes/recentEventsRouter.js");
app.use("/api/recentevents", recentEventsRouter);
const newsRouter = require("./routes/newsRouter.js");
app.use("/api/news", newsRouter);
const guestsRouter = require("./routes/guestsRouter.js");
app.use("/api/guests", guestsRouter);

// The "catchall" handler: for any request that doessn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`NUSocial server listening on ${port}`);
