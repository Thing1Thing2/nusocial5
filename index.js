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
      origin: "https://nusocial4.herokuapp.com",
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

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});

// routers
const router = require('./routes/studentRouter.js')
app.use('/api/students', router)
const chatRouter = require('./routes/chatRouter.js')
app.use('/api/chats', chatRouter)
const postRouter = require('./routes/postRouter.js')
app.use('/api/posts', postRouter)
const friendsListRouter = require('./routes/friendsListRouter.js')
app.use('/api/friends', friendsListRouter)
//static Images Folder
app.use('/ProfilePics', express.static('../client/ProfilePics'))



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);