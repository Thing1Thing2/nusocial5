const express = require('express');
const path = require('path');
const cors = require('cors')
const http = require("http");
const { Server } = require("socket.io");
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

// middleware
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
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
    socket.to(data.chat).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(8000, () => {
  console.log("SERVER RUNNING");
});

// routers
const router = require('./routes/studentRouter.js')
app.use('/api/students', router)
const friendsRouter = require('./routes/friendsRouter.js')
app.use('/api/friends', friendsRouter)
const personalNewsAndNotsRouter = require('./routes/personalNewsAndNotsRouter.js')
app.use('/api/personalnewsandnots', personalNewsAndNotsRouter)

//static Images Folder
app.use('/ProfilePics', express.static('/ProfilePics'))

// The "catchall" handler: for any request that doessn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`NUSocial server listening on ${port}`);

